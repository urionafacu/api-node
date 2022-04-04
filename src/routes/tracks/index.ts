import { Router } from "express";
import {
  getItems,
  createItem,
  deleteItem,
  getItem,
  updateItem,
} from "../../controllers/tracks";
import { validatorCreateItem, validatorGetItem } from "../../validators/tracks";
import customHeader from "../../middlewares/customHeader";

const router = Router();

/**
 * Get all tracks
 */
router.get("/", getItems);

/**
 * Get a track by id
 */
router.get("/:id", validatorGetItem, getItem);

/**
 * Create a new track
 */
router.post("/", customHeader, validatorCreateItem, createItem);

/**
 * Update a track by id
 */
router.put("/:id", validatorCreateItem, validatorGetItem, updateItem);

/**
 * Delete a track by id
 */
router.delete("/:id", validatorGetItem, deleteItem);

export default router;
