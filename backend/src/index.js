import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import datasetRoutes from "./routes/datasets.js";
import explainRoutes from "./routes/explain.js";

dotenv.config(); //this is to let the backend use the api key
console.log("ENV — OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "SET" : "NOT SET");
const app = express();

/*app.use(cors());*/

const allowedOrigins = [
  "https://dsva-visualiser.vercel.app",
  "https://dsa-visualiser-git-main-zohra132s-projects.vercel.app",
  "https://dsa-visualiser-p030f0eku-zohra132s-projects.vercel.app",
  "https://dsa-visualiser-zohra132s-projects.vercel.app",
  "http://localhost:3000"
]
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"));
    }
  },
}));

app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/datasets", datasetRoutes);
app.use("/api/explain", explainRoutes);

//Start Server 
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
