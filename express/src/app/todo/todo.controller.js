const todoService = require('./todo.service');
const { Success, Created, Failure } = require('../../helper/response');

const controller = {};

controller.all = async (req, res) => {
  try {
    const result = await todoService.all(req.query);
    Success(res, result);
  } catch(err) { Failure(res, err); }
};

controller.create = async (req, res) => {
  try {
    const result = await todoService.create(req.body);
    Created(res, result);
  } catch(err) { Failure(res, err); }
};

controller.getById = async (req, res) => {
  try {
    const result = await todoService.getById(req.params.id);
    Success(res, result);
  } catch(err) { Failure(res, err); }
};

controller.update = async (req, res) => {
    try {
      const result = await todoService.update(req.params.id, req.body);
      Success(res, result);
    } catch(err) { Failure(res, err); }
};

controller.changeStatus = async (req, res) => {
  try {
    const result = await todoService.changeStatus(req.params.id);
    Success(res, result);
  } catch(err) { Failure(res, err); }
};

controller.delete = async (req, res) => {
  try {
    const result = await todoService.delete(req.params.id);
    Success(res, result);
  } catch(err) { Failure(res, err); }
};

module.exports = controller;
