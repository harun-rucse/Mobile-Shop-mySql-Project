const AppError = require('../utils/appError');

const handleJWTError = () => {
  return new AppError('Invalid token.Please login again', 401);
};

const handleJWTExpiredError = () => {
  return new AppError('Token has expired.Please login again', 401);
};

const sendErrorDev = (err, req, res) => {
  // A) API ERROR
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  // B) RENDERED WEBSITE ERROR
  return res.status(err.statusCode).render('notFound');
};

const sendErrorProd = (err, req, res) => {
  // A) API ERROR
  if (req.originalUrl.startsWith('/api')) {
    // 1) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }

    // 2) Programming or other unknown error: don't leak error details
    // console.error('ERROR 💥', err);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }

  // B) RENDERED WEBSITE ERROR
  // 1) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('notFound');
  }

  // 2) Programming or other unknown error: don't leak error details
  return res.status(err.statusCode).render('notFound');
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  } else if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  }
};
