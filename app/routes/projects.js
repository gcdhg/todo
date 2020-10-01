
var express = require('express');
var router = express.Router();
var Projects = require('../models/projects.js');

var projects = require('../api/projects')
var auth = require('../config/middleware/auth.js');
var privilage = require('../config/middleware/privilage.js');

const middle = [auth, privilage];

router.get('/:id',middle, projects.getProject )
router.post('/create', auth, projects.createProject)
router.delete('/delete', auth, projects.deleteProject);


module.exports = router;