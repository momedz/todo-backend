const mongoose = require('mongoose');
const { MONGO_URL, MONGO_PORT, MONGO_DB } = require('../config/server');
mongoose.Promise = require('bluebird');

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

const mongo_path = `mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DB}`;
const mongodb = mongoose.createConnection(mongo_path, options);
mongodb.options = options;
mongodb.path = mongo_path;
mongodb.Schema = mongoose.Schema;

mongodb.select = path => {
  const mongo_path = `mongodb://${MONGO_URL}:${MONGO_PORT}/${path}`;
  const connection = mongoose.createConnection(mongo_path, options);
  connection.options = options;
  connection.path = mongo_path;
  connection.Schema = mongoose.Schema;
  return connection;
};

module.exports = mongodb;
