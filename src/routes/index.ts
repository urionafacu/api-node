import { Router } from "express";
import fs from "fs";

const router = Router();

const PATH_ROUTES = __dirname;

fs.readdirSync(PATH_ROUTES).filter((file) => {
  if (file !== "index.ts") {
    router.use(`/${file}`, require(`./${file}`).default);
  }
});

export default router;
