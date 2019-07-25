const morgan = require('morgan');
const { DEBUG } = require('../config/server');

const option = (tokens, req, res) => {
  if ( tokens.method(req, res) != 'GET' && req.payload ) {
    const logs = {
      id: `${base}-${unique}`,
      method: tokens.method(req, res),
      url: decodeURI(tokens.url(req, res)),
      status: tokens.status(req, res),
      'content-length': tokens.res(req, res, 'content-length'),
      'response-time': parseFloat(tokens['response-time'](req, res)),
      body: JSON.stringify(req.body),
      query: JSON.stringify(req.query),
      params: JSON.stringify(req.params)
    };
    return log.join(' ');
  }
};

const develop = (tokens, req, res) => {
  const logs = [
    tokens.method(req, res),
    decodeURI(tokens.url(req, res)),
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms -',
    tokens.res(req, res, 'content-length'), 
  ];
  return logs.join(' ');
};

module.exports = morgan(DEBUG ? develop: option);
