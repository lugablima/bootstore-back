import express from "express";

import { validateNewUser, validateUser, validateUserModification } from "../middlewares/validateUserMiddleware.js";

import { registerUser, logInUser, modifyUser } from "../controllers/authController.js";

import validateToken from "../middlewares/validateTokenMiddleware.js";

const router = express.Router();

router.post("/signup", validateNewUser, registerUser);
router.post("/login", validateUser, logInUser);
router.put("/user", validateToken, validateUserModification, modifyUser);

export default router;
