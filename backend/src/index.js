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

app.use(cors({
  origin: "https://dsva-visualiser.vercel.app",
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
