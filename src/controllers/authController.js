import * as authService from "../services/authService.js";

export async function registerUser(req, res) {
  const user = req.body;

  await authService.registerUser(user);

  res.status(201).send("User successfully registered!");
}

export async function logInUser(req, res) {
  const user = req.body;

  const data = await authService.logInUser(user);

  res.status(200).send(data);
}

export async function modifyUser(req, res) {
  const { user } = res.locals;
  const newUser = req.body;

  const modifiedUser = await authService.modifyUser(user, newUser);

  res.status(200).send(modifiedUser);
}
