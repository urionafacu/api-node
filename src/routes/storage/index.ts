import { Router } from 'express';
import { UserRolEnum } from 'types/user';
import upploadMiddleware from 'utils/handleStorage';
import { createItem, getItems, getItem, deleteItem } from 'controllers/storage';
import { validatorGetItem } from 'validators/storage';
import authMiddleware from 'middlewares/session';
import checkRol from 'middlewares/rol';

const router = Router();

/**
 * Get all files
 */
router.get('/', authMiddleware, getItems);

/**
 * Create a new file
 */
router.post('/', authMiddleware, checkRol([UserRolEnum.ADMIN]), upploadMiddleware.single('myfile'), createItem);

/**
 * Get a file by id
 */
router.get('/:id', authMiddleware, validatorGetItem, getItem);

/**
 * Delete a file by id
 */
router.delete('/:id', authMiddleware, checkRol([UserRolEnum.ADMIN]), validatorGetItem, deleteItem);

export default router;
