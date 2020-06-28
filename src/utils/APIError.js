import httpStatus from 'http-status';

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor({ errorCode, status, errors, statusMessage }) {
    super(status);
    this.name = this.constructor.name;
    this.errorCode = errorCode;
    this.errors = errors;
    this.status = status;
    this.statusMessage = statusMessage;
  }
  isPublic = false;
  status = null;
  statusMessage;
  errors = null;
  errorCode= null;
}
/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  constructor({ errorCode, status, errors, statusMessage }) {
    super({
      errorCode,
      status,
      errors,
      statusMessage,
    });
    if (status) this.status = status;
  }
  status = 'INTERNAL_SERVER_ERROR';
}
export default APIError;