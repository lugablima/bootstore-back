import { createUser, createSession } from "../database/dbManager.js";

export function registerUser(req, res, next) {
  try {
    const { user } = res.locals;

    createUser(user, res);

    res.sendStatus(201);
  } catch (err) {
    console.error("Error while creating a new user", err.message);
    next(err);
  }
}

export async function logInUser(req, res, next) {
  try {
    const { name, _id } = res.locals.user;
    const token = await createSession(_id);

    const data = {
      name,
      token,
    };

    res.status(201).send(data);
  } catch (err) {
    console.error("Error while creating a new session", err.message);
    next(err);
  }
}
