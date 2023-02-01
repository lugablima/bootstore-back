// eslint-disable-next-line no-unused-vars
export default function handleApplicationErrors(err, _req, res, _next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send(err.message);
  }

  if (err.name === "NotFoundError") {
    return res.status(404).send(err.message);
  }

  if (err.name === "ConflictError") {
    return res.status(409).send(err.message);
  }

  res.sendStatus(500);
}
