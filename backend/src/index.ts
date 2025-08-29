import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

connectDB();

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
