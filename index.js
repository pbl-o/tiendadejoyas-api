import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/inventario.routes.js";
import { getDate } from "./database/database.js";
import fs from "node:fs/promises";

export const reqRegister = async (req, res, next) => {
  try {
    const method = req.method;
    const path = req.path;
    const register = `Request received: ${method} ${path}`;
    await fs.appendFile("log.txt", register, "\n");
    next();
  } catch (error) {
    next(error);
  }
};

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(reqRegister);
app.use("/joyas", router);

app.get("/", (req, res) => {
  res.send("PAGE OK");
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await getDate();
});
