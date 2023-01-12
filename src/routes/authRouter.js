import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator.js";
import { signInSchema, signUpSchema, modifyUserSchema } from "../schemas/userSchema.js";
import { registerUser, logInUser, modifyUser } from "../controllers/authController.js";
import validateToken from "../middlewares/authenticationMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), registerUser);
authRouter.post("/sign-in", validateSchema(signInSchema), logInUser);
authRouter.patch("/users", validateToken, validateSchema(modifyUserSchema), modifyUser);

export default authRouter;
