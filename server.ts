import express, { Request, Response, RequestHandler } from "express";
import path from "path";
import multer from "multer";

const app = express();
const port = 3000;

//const __dirname = path.resolve();

const upload = multer({ dest: path.join(__dirname, "uploads/") });

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Type-safe request handler for folder upload
const uploadHandler: RequestHandler = (req, res) => {
  const files = req.files as Express.Multer.File[]; // Type assertion for multiple files

  if (!files || files.length === 0) {
    res.status(400).json({ message: "No files uploaded" });
    return;
  }

  res.json({ message: "Files uploaded successfully", filenames: files.map(file => file.filename) });
};

app.post("/upload-folder", upload.array("files"), uploadHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
