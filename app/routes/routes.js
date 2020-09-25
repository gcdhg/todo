var express = require('express');
var router = express.Router();
var Todo = require('../models/tasks.js');

var api = require('../api/tasks');

router.route('/')
    .get(api.showAllTasks)
    .put(api.completeTask)
    .delete(api.deleteTask);

router.route('/create')
    .post(api.createTask)

router.route('/edit/:id')
    .get(api.getTaskById)
    .post(api.editTask);


module.exports = router;