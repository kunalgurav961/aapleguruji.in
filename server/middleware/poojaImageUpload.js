import multer from "multer";

const supportedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 5 * 1024 * 1024,
    fields: 4,
    fieldSize: 8 * 1024,
  },
  fileFilter: (req, file, callback) => {
    if (!supportedImageTypes.has(file.mimetype)) {
      const error = new Error("Puja images must be JPG, PNG, or WebP files.");
      error.status = 422;
      callback(error);
      return;
    }

    callback(null, true);
  },
}).array("images", 5);

const handlePoojaImageUpload = (req, res, next) => {
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
            ? "Each puja image must be 5 MB or smaller."
            : "Upload up to 5 images using the images field.",
      });
    }

    if (error.status === 422) {
      return res.status(422).json({ message: error.message });
    }

    return next(error);
  });
};

export default handlePoojaImageUpload;
