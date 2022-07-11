import joiBase from "joi";
import joiDate from "@joi/date";

const joi = joiBase.extend(joiDate);

const regexName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\-'\s]+$/;
const regexCpf = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/;

const newCardSchema = joi.object({
  cardNumber: joi.string().trim().required(),
  validity: joi.date().format("MM/YY").required(),
  securityCode: joi.string().alphanum().min(3).required(),
  ownerName: joi.string().pattern(regexName).required(),
  cpf: joi.string().pattern(regexCpf).required(),
  description: joi.string().pattern(regexName).required(),
});

export default newCardSchema;
