import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config";
import mainrouter from "./routers/index";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainrouter);

ConnectDB();

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
