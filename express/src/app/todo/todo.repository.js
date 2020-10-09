const { InternalServiceError } = require('../../helper/failure');
const Todo = require('./todo.model');
const repositories = {};

repositories.validate = data => {
    const todo = new Todo(data);
    const err = todo.validateSync();
    return err;  
};

repositories.all = query => {
    return Todo.find(query).catch(err => {
        throw InternalServiceError(err);
    })
}

repositories.getById = id => {
    return Todo.findOne({ _id: id }).catch(err => {
        throw InternalServiceError(err);
    });
};

repositories.create = data => {
    const todo = new Todo(data);
    return todo.save().catch(err => {
        throw InternalServiceError(err);
    });
};

repositories.update = (id, todo) => {
    return Todo.updateOne({ _id: id }, todo).catch(err => {
        throw InternalServiceError(err);
    });
};

repositories.delete = id => {
    return Todo.findOneAndDelete({ _id: id }).catch(err => {
        throw InternalServiceError(err);
    });
};

module.exports = repositories;