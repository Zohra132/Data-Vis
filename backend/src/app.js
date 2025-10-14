import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import datasetRoutes from "./routes/datasets.js";

const app = express();
/*app.use(cors());*/
app.use(cors({ origin: "https://dsva-visualiser.vercel.app" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/datasets", datasetRoutes);

export default app;
