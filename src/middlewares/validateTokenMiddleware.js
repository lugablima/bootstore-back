import jwt from "jsonwebtoken";
import { findSession, findUser } from "../database/dbManager.js";

export default async function validateToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send("Token is empty.");
    }

    const session = await findSession(token);

    if (!session) {
      return res.status(401).send("Invalid token.");
    }

    try {
      const secret = process.env.JWT_SECRET;
      const decoded = await jwt.verify(token, secret);
      const { exp } = decoded;
      if (Date.now() / 1000 >= exp) {
        return res.status(401).send("Token expired.");
      }
    } catch (err) {
      if (err) {
        return res.status(500).send("Invalid token.");
      }
    }

    const query = { _id: session.userId };
    const userExist = await findUser(query, res);

    if (!userExist) {
      return res.sendStatus(401);
    }

    res.locals.user = userExist;

    next();
  } catch (err) {
    console.error("Error while validating token", err.message);
    return res.sendStatus(500);
  }
}
