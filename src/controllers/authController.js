import { createSession, updateUser, findUser } from "../database/dbManager.js";
import * as authService from "../services/authService.js";

export async function registerUser(req, res) {
  const user = req.body;

  await authService.registerUser(user);

  res.status(201).send("User successfully registered!");
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

export async function modifyUser(req, res, next) {
  try {
    const { user, modifiedUser } = res.locals;

    updateUser(user, modifiedUser);

    const query = { _id: user._id };
    const newUser = await findUser(query);
    delete newUser._id;

    res.status(200).send(newUser);
  } catch (err) {
    console.error("Error while modifying user", err.message);
    next(err);
  }
}
