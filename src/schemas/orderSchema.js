import joi from "joi";

const orderSchema = joi.object({
  totalPrice: joi.number().positive().required(),
  productIds: joi.array().items(joi.string()).min(1).required(),
  cardId: joi.string().trim().required(),
});

export default orderSchema;
