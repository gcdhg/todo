var express = require('express');
var router = express.Router();
var Todo = require('../models/tasks.js');
var User = require('../models/user.js');
var Project = require('../models/projects.js');

var tasks = require('../api/tasks');
var auth = require('../config/middleware/auth.js');
var privilage = require('../config/middleware/privilage.js');

const middle = [auth, privilage];

router.get('/', auth, tasks.showAllTasks)
router.put('/', middle, tasks.completeTask)
router.delete('/', middle, tasks.deleteTask);

router.post('/create', middle, tasks.createTask)

router.get('/edit/:id', middle, tasks.getTaskById)
router.post('/edit', middle, tasks.editTask);

router.get('/data/all', auth, tasks.showAllData);

module.exports = router;