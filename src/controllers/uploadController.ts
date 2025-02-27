import express, { Request, Response, RequestHandler } from "express";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import { addListenInstances, deleteAllListenInstances } from "../models/listenModels";

const uploadFolderPath = path.join(__dirname, "../uploads/");

const upload = multer({ dest: uploadFolderPath });

export const uploadFolder = upload.array("files");

export const processUploadedFolder: RequestHandler = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[]; // Type assertion for multiple files
  let parsedData: any[] = [];

  if (!files || files.length === 0) {
    res.status(400).json({ message: "No files uploaded" });
    return;
  }

  try {
    await deleteAllListenInstances();
    for (const file of files) {
      if (file.originalname.includes('Audio')) {
        const filePath = file.path;
        const fileContent = await fs.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(fileContent);
        await addListenInstances(jsonData);
        parsedData.push(jsonData);
      }
    }

    await clearUploadsFolder();

    //res.json({ message: "Files uploaded successfully", filenames: files.map(file => file.filename) });
    res.redirect("/home");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error processing files:", error);
      res.status(500).json({ message: "Error processing files", error: error.message });
    } else {
      res.status(500).json({ message: "Unkonwn error occurred." })
    }

  }
}

// Helper function to delete all files in the uploads folder
const clearUploadsFolder = async () => {
  try {
    const files = await fs.readdir(uploadFolderPath);
    for (const file of files) {
      const filePath = path.join(uploadFolderPath, file);
      await fs.unlink(filePath);
    }
    console.log("Uploads folder cleared.");
  } catch (error) {
    console.error("Error clearing uploads folder:", error);
  }
};