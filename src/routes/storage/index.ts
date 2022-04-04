import { Router } from "express";
import upploadMiddleware from "../../utils/handleStorage";
import {
  createItem,
  getItems,
  getItem,
  deleteItem,
} from "../../controllers/storage";
import { validatorGetItem } from "../../validators/storage";

const router = Router();

/**
 * Get all files
 */
router.get("/", getItems);

/**
 * Create a new file
 */
router.post("/", upploadMiddleware.single("myfile"), createItem);

/**
 * Get a file by id
 */
router.get("/:id", validatorGetItem, getItem);

/**
 * Delete a file by id
 */
router.delete("/:id", validatorGetItem, deleteItem);

export default router;
