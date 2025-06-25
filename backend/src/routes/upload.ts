import express, { Request, Response } from "express";
import { upload } from "../middleware/upload";

const router = express.Router();

router.post("/", upload.single("file"), (req: Request, res: Response): any => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "File uploades successfully",
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
  })
})

export default router;