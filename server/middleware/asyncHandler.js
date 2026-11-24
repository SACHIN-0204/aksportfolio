// Express 4 does not catch rejected promises — wrap every async handler with this.
export const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
