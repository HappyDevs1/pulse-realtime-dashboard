import express, { Request, Response } from "express";
// import { upload } from "../middleware/upload";
import multer from "multer";
import dotenv from "dotenv";
import { Readable } from "stream";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const accessKey: any = process.env.AWS_ACCESS_KEY;
const secretAccessKey: any = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});

const router = express.Router();

const upload = multer();

router.post("/", upload.single("file"), async (req: Request, res: Response): Promise<any> => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ message: "No file uploaded or No buffer" });
  }

  const params = {
    Bucket: process.env.AWS_RAW_BUCKET as string,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  }

  try {
    await s3Client.send(new PutObjectCommand(params))

    console.log("File uploaded successfully");
    
    res.status(200).json({ message: "File uploaded successfully to S3 bucket" } )
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload file to S3 bucket"})
  }
})

export default router;