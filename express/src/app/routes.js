const router = require('express').Router();
const authentication = require('../lib/authentication');

router.use('/todo', require('./todo/todo.routes'))

module.exports = router;