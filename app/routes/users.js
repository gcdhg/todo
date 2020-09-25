var express = require('express');
var router = express.Router();

var User = require('@ToDoModels/user.js');

var userApi = require('@ToDoApi/user.js');

router.post('/create', userApi.createUser);

router.post('/login', userApi.loginUser);

module.exports = router
