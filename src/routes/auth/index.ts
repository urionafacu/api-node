import { Router } from "express";
import {
  validatorLoginItem,
  validatorRegisterItem,
} from "../../validators/auth";
import { registerController, loginController } from "../../controllers/auth";

const router = Router();

/**
 * create a new user
 */
router.post("/register", validatorRegisterItem, registerController);

/**
 * login
 */
router.post("/login", validatorLoginItem, loginController);

export default router;
