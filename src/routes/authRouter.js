import { Router } from "express";

import { validateNewUser, validateUser } from "../middlewares/validateUserMiddleware.js";

import { registerUser, logInUser } from "../controllers/authController.js";

const router = Router();

router.post("/signup", validateNewUser, registerUser);
router.post("/login", validateUser, logInUser);

export default router;
