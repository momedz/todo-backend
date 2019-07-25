class Failure {
  constructor(code, error) {
    this.code = code;
    this.error = error;
  }    
}

const failure = (status, error) => {
  if ( error instanceof Failure ) return error;
  return new Failure(status, error);
};

module.exports = {
  Failure,
  NotFound: (error = {}) => failure(404, error),
  Forbidden: (error = {}) => failure(403, error),
  BadRequest: (error = {}) => failure(400, error),
  Unauthorized: (error = {}) => failure(401, error),
  InternalServiceError: (error = {}) => failure(500, error),
};