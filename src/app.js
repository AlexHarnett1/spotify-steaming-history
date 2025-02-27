import express from "express";
import path from "path";
import uploadRoutes from "./routes/uploadRoutes.js";
import db from "./config/db.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Workaround for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use("/api", uploadRoutes);
// app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "home.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
