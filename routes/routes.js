var express = require('express');
var router = express.Router();
var Todo = require('../models/tasks.js');

var tasks = require('../controllers/tasks');

/* GET home page. */
router.get('/', tasks.showAllTasks);
router.put('/', tasks.completeTask);
router.delete('/', tasks.deleteTask);
router.get('/:id', tasks.getTaskById);
router.get('/create', tasks.getForm);
router.post('/create', tasks.createTask);
router.put('/create', tasks.editTask)
router.put('/edit', tasks.editTask);
router.post('/edit', tasks.getUpdateTask);


module.exports = router;