import joi from "joi";

export const newUserSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).trim().required(),
  confirmation: joi.string().valid(joi.ref("password")).required(),
});

export const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().trim().required(),
});

export const modifiedUserSchema = joi.object({
  name: joi.string(),
  email: joi.string().email(),
  password: joi.string().min(6),
});
