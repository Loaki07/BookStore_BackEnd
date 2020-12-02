class ErrorResponse extends Error {
  /**
   * @description Function to create unique error response with status code
   * @param {String} message
   * @param {Number} statusCode
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorResponse;
