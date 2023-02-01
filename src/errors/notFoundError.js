export default function notFoundError(message = "") {
  return {
    name: "NotFoundError",
    message,
  };
}
