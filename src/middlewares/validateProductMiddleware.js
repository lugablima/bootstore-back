import productSchema from "../schemas/productSchema.js";

export default async function validateProduct(req, res, next) {
  try {
    const product = req.body;

    const validate = productSchema.validate(product, {
      abortEarly: false,
    });

    if (validate.error) {
      return res.status(422).send(validate.error.details.map((err) => ({ message: err.message })));
    }

    res.locals.product = product;
    next();
  } catch (err) {
    console.error("Error while validating product", err.message);
    return res.sendStatus(500);
  }
}
