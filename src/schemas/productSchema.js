import joi from "joi";

const productSchema = joi.object({
  name: joi.string().trim().required(),
  description: joi.string().trim().required(),
  price: joi.number().required(),
  image: joi.string().trim().uri().required(),
  color: joi
    .string()
    .trim()
    .regex(/^#[A-Fa-f0-9]{6}$/),
  sizes: joi.array().items(joi.string()).min(1),
});

export default productSchema;
