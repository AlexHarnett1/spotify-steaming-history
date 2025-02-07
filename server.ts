import express, { Request, Response, RequestHandler } from "express";
import path from "path";
import multer from "multer";
import fs from "fs/promises"
import db from "./db";
import { ListenInstance } from "./db";


const app = express();
const port = 3000;

//const __dirname = path.resolve();

const upload = multer({ dest: path.join(__dirname, "uploads/") });

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Type-safe request handler for folder upload
const uploadHandler: RequestHandler = async (req, res) => {
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
        parsedData.push(jsonData);
      }
    }
    res.json({ message: "Files uploaded successfully", filenames: files.map(file => file.filename) });

  } catch (error) {
    console.error("Error processing files:", error);
    res.status(500).json({ message: "Error processing files", error: error.message });
  }

};

app.post("/upload-folder", upload.array("files"), uploadHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
