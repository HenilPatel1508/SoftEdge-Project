import express from "express";
import supabase from "./config/supabaseClient.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();



app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Express + Supabase working 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});