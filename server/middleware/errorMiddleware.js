const HttpError = require('../models/http-error-model');
const { ValidationError } = require('mongoose').Error; // Example for mongoose validation error

// Not Found Middleware
const notFound = (req, res, next) => {
  next(new HttpError(`Not Found - ${req.originalUrl}`, 404));
};

// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    // If the error is an instance of HttpError, use its code and message
    res.status(err.code).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  } else {
    // Handle specific error types
    if (err instanceof ValidationError) {
      err = new HttpError('Validation Error', 400);
    } else if (!err.statusCode) {
      // Handle unexpected errors
      err = new HttpError(err.message || 'Internal Server Error', 500);
    }

    // Respond with the error message
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  }
};

module.exports = { notFound, errorHandler };
