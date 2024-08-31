import express from "express";
import cors from "cors";
import AuthRouter from "./routes/client.r.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

const mongoURI = "mongodb://localhost:27017/SIH2024";

async function main() {
  mongoose.connect(mongoURI);
  console.log("Connected to MongoDB");
}

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/auth", AuthRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

main().catch((err) => console.log(err));
