import joi from "joi";

const newCardSchema = joi.object({
  card_number: joi.integer().required(),
  validity: joi.date().required(),
  security_code: joi.string().alphanum().trim().required(),
  owner_name: joi.string().trim().required(),
  cpf: joi.string().required(),
});

export default newCardSchema;
