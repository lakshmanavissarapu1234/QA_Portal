import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test API
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "QA Portal backend is running",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`QA Portal backend running on http://localhost:${PORT}`);
});