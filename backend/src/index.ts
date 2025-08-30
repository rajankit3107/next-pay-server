import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

ConnectDB();

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
