class ResponseTrait {
    static success(res, data = null, message = 'Request was successful', statusCode = 200) {
      return res.status(statusCode).json({
        status: 'success',
        message,
        data,
      });
    }
  
    static error(res, message = 'Something went wrong', statusCode = 400, error = null) {
      return res.status(statusCode).json({
        status: 'error',
        message,
        error,
      });
    }
  
    static validationError(res, errors, message = 'Validation failed', statusCode = 422) {
      return res.status(statusCode).json({
        status: 'error',
        message,
        errors,
      });
    }
  }
  
  module.exports = ResponseTrait;
  