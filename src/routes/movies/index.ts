import { Router } from 'express';
import { UserRolEnum } from 'types/user';
import { getItems, createItem, deleteItem, getItem, updateItem } from 'controllers/movies';
import authMiddleware from 'middlewares/session';
import checkRol from 'middlewares/rol';
import { validatorRegisterItem } from 'validators/movies';

const router = Router();

/**
 * Get all movies
 */
router.get('/', authMiddleware, checkRol([UserRolEnum.USER, UserRolEnum.ADMIN]), getItems);

/**
 * Get a movie by id
 */
router.get('/:id', authMiddleware, checkRol([UserRolEnum.USER, UserRolEnum.ADMIN]), getItem);

/**
 * Create a new movie
 */
router.post('/', authMiddleware, checkRol([UserRolEnum.USER, UserRolEnum.ADMIN]), validatorRegisterItem, createItem);

/**
 * Update a movie by id
 */
router.put('/:id', authMiddleware, checkRol([UserRolEnum.USER, UserRolEnum.ADMIN]), updateItem);

/**
 * Delete a movie by id
 */
router.delete('/:id', authMiddleware, checkRol([UserRolEnum.USER, UserRolEnum.ADMIN]), deleteItem);

export default router;
