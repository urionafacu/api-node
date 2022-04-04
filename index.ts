import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import dbConnect from "./src/config/mongo";
import routes from "./src/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("src/storage"));

app.get("/ping", (req: Request, res: Response) => {
  return res.status(200).json({ message: "pong", time: Date.now() });
});

/**
 *  Routes
 */

app.use("/api", routes);

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, () => {
  console.log("⚡️Server is running on port:", PORT);
});

dbConnect();
