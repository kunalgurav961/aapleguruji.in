import multer from "multer";

const supportedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const supportedVideoTypes = new Set(["video/mp4", "video/webm", "video/quicktime"]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 2,
    fileSize: 50 * 1024 * 1024,
    fields: 6,
    fieldSize: 24 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const supportedType =
      file.fieldname === "video"
        ? supportedVideoTypes.has(file.mimetype)
        : file.fieldname === "coverImage" &&
          supportedImageTypes.has(file.mimetype);

    if (!supportedType) {
      const error = new Error(
        "Add one MP4, WebM, or MOV video and an optional JPG, PNG, or WebP cover image.",
      );
      error.status = 422;
      callback(error);
      return;
    }

    callback(null, true);
  },
}).fields([
  { name: "video", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);

const handleBlogUpload = (req, res, next) => {
  upload(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError) {
      const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 422;
      return res.status(status).json({
        message:
          error.code === "LIMIT_FILE_SIZE"
            ? "Each blog media file must be 50 MB or smaller."
            : "Upload one video and optionally one cover image.",
      });
    }

    if (error.status === 422) {
      return res.status(422).json({ message: error.message });
    }

    return next(error);
  });
};

export default handleBlogUpload;
