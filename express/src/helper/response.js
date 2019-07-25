const { Failure } = require('./failure');

const response = (res, status, data = {}) => res.status(status).json(data);

module.exports = {
  Success: (res, data = {}) => response(res, 200, data),
  Created: (res, data = {}) => response(res, 201, data),
  Failure: (res, err = null) => {
    console.log(err);
    if (err instanceof Failure) response(res, err.code, err.error);
    else if( err ) response(res, 400, err);
    else response(res, 501);
  }
};