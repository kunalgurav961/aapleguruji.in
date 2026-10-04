import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20000,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
      default: "",
    },
    readTime: {
      type: Number,
      default: 1,
      min: 1,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "blogs",
  },
);

blogSchema.index({ isPublished: 1, createdAt: -1 });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
