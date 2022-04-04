import { Router } from "express";
import {
  getItems,
  createItem,
  deleteItem,
  getItem,
  updateItem,
} from "../../controllers/tracks";
import { validatorCreateItem, validatorGetItem } from "../../validators/tracks";
import authMiddleware from "../../middlewares/session";
import checkRol from "../../middlewares/rol";
import { UserEnum } from "../../models/nosql/users";

const router = Router();

/**
 * Get all tracks
 */
router.get("/", authMiddleware, getItems);

/**
 * Get a track by id
 */
router.get("/:id", authMiddleware, validatorGetItem, getItem);

/**
 * Create a new track
 */
router.post(
  "/",
  authMiddleware,
  checkRol([UserEnum.ADMIN]),
  validatorCreateItem,
  createItem
);

/**
 * Update a track by id
 */
router.put(
  "/:id",
  authMiddleware,
  checkRol([UserEnum.ADMIN]),
  validatorCreateItem,
  validatorGetItem,
  updateItem
);

/**
 * Delete a track by id
 */
router.delete(
  "/:id",
  authMiddleware,
  checkRol([UserEnum.ADMIN]),
  validatorGetItem,
  deleteItem
);

export default router;
