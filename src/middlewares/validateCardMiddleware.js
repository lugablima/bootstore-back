import newCardSchema from "../schemas/cardSchema.js";

// eslint-disable-next-line consistent-return
export default function validateCard(req, res, next) {
  const { user } = res.locals;
  const card = req.body;

  const { error } = newCardSchema.validate(card, { abortEarly: false });

  if (error) {
    return res.status(422).send(error.details.map((err) => ({ message: err.message })));
  }

  res.locals = { card, user };

  next();
}
