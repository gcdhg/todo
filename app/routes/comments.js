var express = require('express');
var router = express.Router();

var Todo = require('../models/tasks.js');
var User = require('../models/user.js');
var Project = require('../models/projects.js');
// var Comments = require('../models/comments.js');

var comments = require('../api/comments')
var auth = require('../config/middleware/auth.js')


module.exports = router;