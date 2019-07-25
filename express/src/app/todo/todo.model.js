const mongoose = require('../../lib/mongoose');

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: Boolean, default: 'false' }
}, {
  version: false
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
