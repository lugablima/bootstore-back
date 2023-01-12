export default function unauthorizedError(message = "") {
  return {
    name: "UnauthorizedError",
    message,
  };
}
