import express, { raw, Request, Response } from "express";
// import { upload } from "../middleware/upload";
import multer from "multer";
import dotenv from "dotenv";
import { Readable } from "stream";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import db from "../models"

dotenv.config();

const accessKey: any = process.env.AWS_ACCESS_KEY;
const secretAccessKey: any = process.env.AWS_SECRET_ACCESS_KEY
const rawBucket = process.env.AWS_RAW_BUCKET as string;

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});

const router = express.Router();

const upload = multer();

const Dataset = db.dataset;

router.post("/data/:organisationId", upload.single("file"), async (req: Request, res: Response): Promise<any> => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ message: "No file uploaded or No buffer" });
  }

  const params = {
    Bucket: rawBucket,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  }

  try {
    const { organisationId } = req.params;

    if (!organisationId) {
      return res.status(400).json({ message: "Organisation ID is required" });
    }

    await s3Client.send(new PutObjectCommand(params))

    const s3Path = `https://${rawBucket}.s3.amazonaws.com/${req.file.originalname}`;

    const savedDataset = await Dataset.create({
      organisation_id: organisationId,
      s3_path: s3Path,
    });
    
    res.status(200).json({
      message: "File uploaded successfully to S3 bucket",
      dataset: {
        id: savedDataset.id,
        organisation_id: savedDataset.organisation_id,
        s3_path: savedDataset.s3_path,
      }});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload file to S3 bucket"})
  }
})

export default router;