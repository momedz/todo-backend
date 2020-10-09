const todoRepository = require('./todo.repository');
const { BadRequest, NotFound } = require('../../helper/failure');
const service = {};

service.all = async query => {
  try {
    return await todoRepository.all(query);;
  } catch(err) { throw BadRequest(err); }
};

service.create = async data => {
  try {
    console.log(data);
    const err = await todoRepository.validate(data);
    if(err) throw BadRequest(err);
    return await todoRepository.create(data);
  } catch(err) { throw BadRequest(err); }
};

service.getById = async id => {
  try {
    const todo = await todoRepository.getById(id);
    if(todo == null) throw NotFound(err);
    return todo.toObject();
  } catch(err) { throw BadRequest(err); }
};

service.update = async (id, body) => {
  try {
    const todo = await service.getById(id);
    const err = await todoRepository.validate({ ...todo, ...body });
    if(err) throw BadRequest(err);
    return await todoRepository.update(todo._id, { ...todo, ...body });
  } catch(err) { throw BadRequest(err); }
};

service.changeStatus = async id => {
  try {
    const todo = await service.getById(id);
    return await todoRepository.update(todo._id, { status: !todo.status });
  } catch(err) { throw BadRequest(err); }
};

service.delete = async id => {
  try {
    const todo = await service.getById(id);
    return await todoRepository.delete(todo._id);
  } catch(err) { throw BadRequest(err); }
};

module.exports = service;