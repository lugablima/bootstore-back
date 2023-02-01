import jwt from "jsonwebtoken";
import * as sessionRepository from "../repositories/sessionRepository.js";
import * as userRepository from "../repositories/userRepository.js";
import unauthorizedError from "../errors/unauthorizedError.js";

export default async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    throw unauthorizedError("Token is empty.");
  }

  const session = await sessionRepository.findOne({ token });

  if (!session) {
    throw unauthorizedError("Invalid token.");
  }

  try {
    const { exp } = jwt.verify(token, process.env.JWT_SECRET);

    if (Date.now() / 1000 >= exp) {
      throw unauthorizedError("Token expired.");
    }

    const userExist = await userRepository.findOne({ _id: session.userId });

    if (!userExist) {
      throw unauthorizedError("Non-existent user.");
    }

    res.locals.user = userExist;

    next();
  } catch (err) {
    throw unauthorizedError("Invalid token.");
  }
}
