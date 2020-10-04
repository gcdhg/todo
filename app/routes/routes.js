var express = require('express');
var router = express.Router();

var Todo = require('../models/tasks.js');
var User = require('../models/user.js');
var Project = require('../models/projects.js');

var tasks = require('../api/tasks');
var auth = require('../config/middleware/auth.js');
var privilage = require('../config/middleware/privilage.js');

const middle = [auth, privilage];

router.get('/', auth, tasks.showAllPrivateTasks);
router.post('/create', middle, tasks.createTask);
router.get('/:id', middle, tasks.getTaskById);
router.post('/:id', middle, tasks.editTask);
router.delete('/:id', middle, tasks.deleteTask);
router.post('/state/:id', middle, tasks.changeState);

module.exports = router;