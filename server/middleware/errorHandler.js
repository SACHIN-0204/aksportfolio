export function notFound(_req, res) {
  res.status(404).json({ message: "Route not found" });
}

export function errorHandler(err, _req, res, _next) {
  let status = err.status || err.statusCode || 500;
  let message = err.message || "Internal server error";

  if (err.name === "CastError") { status = 400; message = "Invalid ID or value"; }
  else if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors).map(e => e.message).join(", ");
  } else if (err.type === "entity.parse.failed") { status = 400; message = "Malformed JSON body"; }
  else if (err.code === 11000) { status = 409; message = "Duplicate value"; }

  if (status >= 500) { console.error(err); message = "Internal server error"; }
  res.status(status).json({ message });
}
