import { Request, Response } from "express";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { GetObjectCommandOutput } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { Readable } from "stream";

dotenv.config();

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Helper function to convert a Readable stream to a string
const streamToString = async (stream: Readable): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
};

export const getSalesData = async (req: Request, res: Response) => {
  try {
    const key = req.query.key as string;
    const bucketName = process.env.AWS_CLEANED_BUCKET as string;

    if (!key) {
      res.status(400).json({ message: "Missing 'key' query parameter" });
    }

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const data: GetObjectCommandOutput = await s3Client.send(command);
    const bodyContents = await streamToString(data.Body as Readable);

    const json = JSON.parse(bodyContents);

    res.status(200).json(json);
  } catch (error) {
    console.error("Internal Server Error", error);
    res.status(500).json({ message: "Failed to retrieve file from S3" });
  }
};
