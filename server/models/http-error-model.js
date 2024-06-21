class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
    this.isOperational = true; // Marking this error as operational
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = HttpError;
