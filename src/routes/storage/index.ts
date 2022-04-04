import { Router } from "express";
import upploadMiddleware from "../../utils/handleStorage";
import { createItem, getItems } from "../../controllers/storage";

const router = Router();

router.get("/", getItems);
router.post("/", upploadMiddleware.single("myfile"), createItem);

export default router;
