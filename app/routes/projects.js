
var express = require('express');
var router = express.Router();

var Todo = require('../models/tasks.js');
var User = require('../models/user.js');
var Project = require('../models/projects.js');

var projects = require('../api/projects');

var auth = require('../config/middleware/auth.js');
var privilage = require('../config/middleware/privilage.js');

const middle = [auth, privilage];

router.get('/get', auth, projects.getUserAssociatedProject);
router.get('/:project', auth, projects.getOneProject);

router.post('/create', auth, projects.createProject);

router.put('/add', middle, projects.addUserToProject);
router.put('/edit', middle, projects.editOneProject);

router.delete('/delete', middle, projects.deleteProject);


module.exports = router;