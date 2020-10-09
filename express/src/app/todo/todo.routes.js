const express = require('express');
const router = express.Router();
const controller = require('./todo.controller');

router.get('', controller.all);
router.post('', controller.create);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.patch('/:id', controller.changeStatus)
router.delete('/:id', controller.delete);

module.exports = router;
