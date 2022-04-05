import { Router } from 'express';
import { UserRolEnum } from 'types/user';
import { getItems, createItem, deleteItem, getItem, updateItem } from 'controllers/movies';
import authMiddleware from 'middlewares/session';
import checkRol from 'middlewares/rol';

const router = Router();

/**
 * Get all movies
 */
router.get('/', authMiddleware, getItems);

/**
 * Get a movie by id
 */
router.get('/:id', authMiddleware, getItem);

/**
 * Create a new movie
 */
router.post('/', authMiddleware, checkRol([UserRolEnum.ADMIN]), createItem);

/**
 * Update a movie by id
 */
router.put('/:id', authMiddleware, checkRol([UserRolEnum.ADMIN]), updateItem);

/**
 * Delete a movie by id
 */
router.delete('/:id', authMiddleware, checkRol([UserRolEnum.ADMIN]), deleteItem);

export default router;
