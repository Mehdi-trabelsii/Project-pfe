import httpStatus from 'http-status';
import APIError from '../utils/APIError';
/**
 * Error handler. Send stacktrace only during development
 * @public
 */
export const handler = (err, res) => {
  let response = {
    status: 'UNKNOWN_ERROR',
    errorCode: 'UNKNOWN_ERROR',
  };

  let status = httpStatus.INTERNAL_SERVER_ERROR;

  if (err instanceof APIError) {
    status = httpStatus[err.status];
    response = {
      errorCode: err.errorCode,
      status: err.statusMessage,
      errors: err.errors,
    };
  }
  res.status(status);
  res.json(response);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
export const notFound = (req, res) => {
  const err = new APIError({
    status: 'NOT_FOUND',
    errorCode: 'NOT_FOUND',
    statusMessage: 'INVALID_REQUEST',
  });
  return handler(err, res);
};
