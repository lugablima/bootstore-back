import joi from "joi";

const newOrderSchema = joi.object({
  priceTotal: joi.number().positive().required(),
  productIds: joi.array().items(joi.string()).min(1),
  cardId: joi.string().trim().required(),
});

export default newOrderSchema;
