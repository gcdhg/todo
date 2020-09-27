var express = require('express');
var router = express.Router();
var Todo = require('../models/tasks.js');

var api = require('../api/tasks');
var auth = require('../config/middleware/auth.js')

router.get('/', auth, api.showAllTasks)
router.put('/', auth, api.completeTask)
router.delete('/', auth, api.deleteTask);

router.post('/create', auth, api.createTask)

router.get('/edit/:id', auth, api.getTaskById)
router.post('/edit/:id', auth, api.editTask);


module.exports = router;