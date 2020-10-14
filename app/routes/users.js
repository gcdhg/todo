var express = require('express');
var router = express.Router();

var Todo = require('../models/tasks.js');
var User = require('../models/user.js');
var Project = require('../models/projects.js');

const userApi = require('../api/user');
var auth = require('../config/middleware/auth.js');
var privilage = require('../config/middleware/privilage.js');

const middle = [auth, privilage];

router.get('/:id', auth, userApi.getUser)
router.post('/create', userApi.createUser);
router.post('/find', auth, userApi.findUserByUsername)
router.post('/login', userApi.loginUser);
router.post('/logout', auth, userApi.logoutUserOnce);
router.post('/logout/all', auth, userApi.logoutUserOnAllDevices);
router.delete('/delete', auth, userApi.deleteUser);


module.exports = router
