import express, { Request, Response, RequestHandler } from "express";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import { addListenInstances } from "../models/listenModels";

const upload = multer({ dest: path.join(__dirname, "../uploads/") });

export const uploadFolder = upload.array("files");

export const processUploadedFolder: RequestHandler = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[]; // Type assertion for multiple files
  let parsedData: any[] = [];

  if (!files || files.length === 0) {
    res.status(400).json({ message: "No files uploaded" });
    return;
  }

  try {
    for (const file of files) {
      if (file.originalname.includes('Audio')) {
        const filePath = file.path;
        const fileContent = await fs.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(fileContent);
        await addListenInstances(jsonData);
        parsedData.push(jsonData);
      }
    }
    res.json({ message: "Files uploaded successfully", filenames: files.map(file => file.filename) });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error processing files:", error);
      res.status(500).json({ message: "Error processing files", error: error.message });
    } else {
      res.status(500).json({ message: "Unkonwn error occurred." })
    }

  }
}
