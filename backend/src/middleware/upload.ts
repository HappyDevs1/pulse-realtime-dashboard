import multer from "multer";
import path from "path";

// Set storage destination and filename format
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Save files to /uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Accept single file from field named "file"
export const upload = multer({ storage });
