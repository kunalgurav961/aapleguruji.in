import mongoose from "mongoose";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import Blog from "../models/blogModel.js";

const blogUploadDirectory = new URL("../uploads/blogs/", import.meta.url);
const uploadDirectoryPath = fileURLToPath(blogUploadDirectory);

const imageTypes = {
  "image/jpeg": {
    extension: "jpg",
    isValid: (buffer) =>
      buffer.length >= 3 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff,
  },
  "image/png": {
    extension: "png",
    isValid: (buffer) =>
      buffer.length >= 8 &&
      buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
  },
  "image/webp": {
    extension: "webp",
    isValid: (buffer) =>
      buffer.length >= 12 &&
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP",
  },
};

const videoTypes = {
  "video/mp4": {
    extension: "mp4",
    isValid: (buffer) =>
      buffer.length >= 12 && buffer.toString("ascii", 4, 8) === "ftyp",
  },
  "video/quicktime": {
    extension: "mov",
    isValid: (buffer) =>
      buffer.length >= 12 && buffer.toString("ascii", 4, 8) === "ftyp",
  },
  "video/webm": {
    extension: "webm",
    isValid: (buffer) =>
      buffer.length >= 4 && buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3])),
  },
};

const makeSlug = (title) =>
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || `blog-${Date.now()}`;

const getBlogFields = (blog) => ({
  _id: blog._id,
  title: blog.title,
  slug: blog.slug,
  category: blog.category,
  excerpt: blog.excerpt,
  content: blog.content,
  videoUrl: blog.videoUrl,
  coverImageUrl: blog.coverImageUrl,
  readTime: blog.readTime,
  isPublished: blog.isPublished,
  createdAt: blog.createdAt,
});

export const getPublicBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .select("title slug category excerpt content videoUrl coverImageUrl readTime createdAt")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.status(200).json({ blogs });
  } catch (error) {
    console.error("Get public blogs error:", error);
    return res.status(500).json({ message: "Unable to load blog articles." });
  }
};

export const getAdminBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    return res.status(200).json({ blogs: blogs.map(getBlogFields) });
  } catch (error) {
    console.error("Get admin blogs error:", error);
    return res.status(500).json({ message: "Unable to load blog articles." });
  }
};

export const createAdminBlog = async (req, res) => {
  const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
  const category =
    typeof req.body.category === "string" ? req.body.category.trim() : "";
  const excerpt =
    typeof req.body.excerpt === "string" ? req.body.excerpt.trim() : "";
  const content =
    typeof req.body.content === "string" ? req.body.content.trim() : "";
  const isPublished = req.body.isPublished === "true";
  const video = req.files?.video?.[0];
  const coverImage = req.files?.coverImage?.[0];

  if (title.length < 5 || title.length > 160) {
    return res.status(422).json({
      message: "Blog title must be between 5 and 160 characters.",
    });
  }
  if (!category || category.length > 60) {
    return res.status(422).json({
      message: "Enter a category up to 60 characters.",
    });
  }
  if (excerpt.length < 10 || excerpt.length > 300) {
    return res.status(422).json({
      message: "Blog excerpt must be between 10 and 300 characters.",
    });
  }
  if (content.length < 30 || content.length > 20000) {
    return res.status(422).json({
      message: "Blog content must be between 30 and 20000 characters.",
    });
  }
  if (!video) {
    return res.status(422).json({ message: "Select a video for this blog." });
  }
  if (coverImage && coverImage.size > 5 * 1024 * 1024) {
    return res.status(413).json({
      message: "The blog cover image must be 5 MB or smaller.",
    });
  }
  if (!videoTypes[video.mimetype]?.isValid(video.buffer)) {
    return res.status(422).json({
      message: "The uploaded blog video is not a valid MP4, WebM, or MOV file.",
    });
  }
  if (
    coverImage &&
    !imageTypes[coverImage.mimetype]?.isValid(coverImage.buffer)
  ) {
    return res.status(422).json({
      message: "The cover image must be a valid JPG, PNG, or WebP file.",
    });
  }

  const slug = makeSlug(title);
  const words = `${excerpt} ${content}`.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  try {
    if (await Blog.exists({ slug })) {
      return res.status(409).json({
        message: "A blog article with a similar title already exists.",
      });
    }

    await mkdir(uploadDirectoryPath, { recursive: true });
    const savedFiles = [];

    try {
      const videoExtension = videoTypes[video.mimetype].extension;
      const videoFileName = `${randomUUID()}.${videoExtension}`;
      const videoFilePath = new URL(videoFileName, blogUploadDirectory);
      await writeFile(videoFilePath, video.buffer, { flag: "wx" });
      savedFiles.push(videoFilePath);

      let coverImageUrl = "";
      if (coverImage) {
        const imageExtension = imageTypes[coverImage.mimetype].extension;
        const imageFileName = `${randomUUID()}.${imageExtension}`;
        const imageFilePath = new URL(imageFileName, blogUploadDirectory);
        await writeFile(imageFilePath, coverImage.buffer, { flag: "wx" });
        savedFiles.push(imageFilePath);
        coverImageUrl = `/api/uploads/blogs/${imageFileName}`;
      }

      const blog = await Blog.create({
        title,
        slug,
        category,
        excerpt,
        content,
        videoUrl: `/api/uploads/blogs/${videoFileName}`,
        coverImageUrl,
        readTime,
        isPublished,
        authorId: req.user._id,
      });

      return res.status(201).json({
        message: isPublished ? "Blog published successfully." : "Blog saved as a draft.",
        blog: getBlogFields(blog),
      });
    } catch (error) {
      await Promise.all(
        savedFiles.map((filePath) =>
          unlink(filePath).catch((cleanupError) => {
            console.error("Remove incomplete blog media error:", cleanupError);
          }),
        ),
      );
      throw error;
    }
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        message: "A blog article with a similar title already exists.",
      });
    }
    console.error("Create admin blog error:", error);
    return res.status(500).json({ message: "Unable to save the blog article." });
  }
};

export const updateAdminBlogStatus = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.blogId)) {
    return res.status(404).json({ message: "Blog article not found." });
  }
  if (typeof req.body.isPublished !== "boolean") {
    return res.status(422).json({ message: "Choose a valid publish status." });
  }

  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      { isPublished: req.body.isPublished },
      { new: true, runValidators: true },
    ).lean();
    if (!blog) {
      return res.status(404).json({ message: "Blog article not found." });
    }
    return res.status(200).json({
      message: blog.isPublished ? "Blog published." : "Blog moved to drafts.",
      blog: getBlogFields(blog),
    });
  } catch (error) {
    console.error("Update admin blog status error:", error);
    return res.status(500).json({ message: "Unable to update blog status." });
  }
};
