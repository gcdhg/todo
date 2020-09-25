var express = require('express');
var router = express.Router();

var User = require('@ToDoModels/user.js');
var auth = require('../config/middleware/auth.js')

const userApi = require('../api/user');

router.post('/create', userApi.createUser);

router.post('/login', userApi.loginUser);

router.delete('/delete', userApi.deleteUser);

router.post('/logout', userApi.logoutUserOnce);

module.exports = router
