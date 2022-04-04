import { Router } from "express";
import upploadMiddleware from "../../utils/handleStorage";
import {
  createItem,
  getItems,
  getItem,
  deleteItem,
} from "../../controllers/storage";
import { validatorGetItem } from "../../validators/storage";
import authMiddleware from "../../middlewares/session";
import checkRol from "../../middlewares/rol";
import { UserEnum } from "../../models/nosql/users";

const router = Router();

/**
 * Get all files
 */
router.get("/", authMiddleware, getItems);

/**
 * Create a new file
 */
router.post(
  "/",
  authMiddleware,
  checkRol([UserEnum.ADMIN]),
  upploadMiddleware.single("myfile"),
  createItem
);

/**
 * Get a file by id
 */
router.get("/:id", authMiddleware, validatorGetItem, getItem);

/**
 * Delete a file by id
 */
router.delete(
  "/:id",
  authMiddleware,
  checkRol([UserEnum.ADMIN]),
  validatorGetItem,
  deleteItem
);

export default router;
