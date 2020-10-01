var express = require('express');
var router = express.Router();

var User = require('@ToDoModels/user.js');

const userApi = require('../api/user');
var auth = require('../config/middleware/auth.js')

router.get('/:id', auth, userApi.getUser)

router.post('/create', userApi.createUser);

router.post('/login', userApi.loginUser);

router.delete('/delete', userApi.deleteUser);

router.post('/logout', auth, userApi.logoutUserOnce);

module.exports = router
