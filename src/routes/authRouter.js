import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator.js";
import { signUpSchema } from "../schemas/userSchema.js";

import { validateUser, validateUserModification } from "../middlewares/validateUserMiddleware.js";

import { registerUser, logInUser, modifyUser } from "../controllers/authController.js";

import validateToken from "../middlewares/validateTokenMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), registerUser);
authRouter.post("/sign-in", validateUser, logInUser);
authRouter.put("/user", validateToken, validateUserModification, modifyUser);

export default authRouter;
