import express from "express";
import path from "path";
import uploadRoutes from "./routes/uploadRoutes";
import db from "./config/db";

const app = express();
const port = 3000;
app.use("/api", uploadRoutes);
// app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
