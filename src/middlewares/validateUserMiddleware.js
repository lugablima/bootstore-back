import bcrypt from "bcrypt";

import { findUser } from "../database/dbManager.js";
import { newUserSchema, userSchema } from "../schemas/userSchema.js";

export async function validateNewUser(req, res, next) {
  try {
    const user = req.body;

    const validate = newUserSchema.validate(user, {
      abortEarly: false,
    });

    if (validate.error) {
      return res.status(422).send(validate.error.details.map((err) => ({ message: err.message })));
    }

    const query = { email: user.email };
    const userExist = await findUser(query, res);

    if (userExist) {
      return res.status(409).send("User already registered.");
    }

    res.locals.user = user;
    next();
  } catch (err) {
    console.error("Error while validating new user", err.message);
    return res.sendStatus(500);
  }
}

export async function validateUser(req, res, next) {
  try {
    const user = req.body;

    const validate = userSchema.validate(user, {
      abortEarly: false,
    });

    if (validate.error) {
      return res.status(422).send(validate.error.details.map((err) => ({ message: err.message })));
    }

    const query = { email: user.email };
    const userExist = await findUser(query, res);

    const validatePassword = userExist && bcrypt.compareSync(user.password, userExist.password);

    if (validatePassword) {
      res.locals.user = userExist;
      next();
    } else {
      return res.status(404).send("Invalid e-mail or password.");
    }
  } catch (err) {
    console.error("Error while validating user", err.message);
    return res.sendStatus(500);
  }
}
