// typescript

import express, { Request, Response } from "express";
import path from 'path';
import multer from 'multer';

const app = express();
const port = 3000;
const upload = multer({ dest: "uploads/" })

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/upload", upload.single("file"), (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({ message: "File uploaded successfully", filename: req.file.filename });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});