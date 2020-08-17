var express = require('express');
var router = express.Router();
var Todo = require('../models/tasks.js');

var api = require('../api/tasks');

router.route('/')
    .get(api.showAllTasks)
    .put(api.completeTask)
    .delete(api.deleteTask);

router.route('/create')
    .get(api.getForm)
    .post(api.createTask)
    .put(api.editTask);

router.route('/edit')
    .put(api.editTask);

router.route('/edit/:id')
    .get(api.getUpdateTask);

router.route('/:id')
    .get(api.getTaskById);


module.exports = router;