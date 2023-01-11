import { Router } from "express";

import { validateNewUser, validateUser, validateUserModification } from "../middlewares/validateUserMiddleware.js";

import { registerUser, logInUser, modifyUser } from "../controllers/authController.js";

import validateToken from "../middlewares/validateTokenMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", validateNewUser, registerUser);
authRouter.post("/login", validateUser, logInUser);
authRouter.put("/user", validateToken, validateUserModification, modifyUser);

export default authRouter;
