import joi from "joi";

export const newUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmation: joi.string().valid(joi.ref("password")).required(),
});

export const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
