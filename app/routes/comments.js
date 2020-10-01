var express = require('express');
var router = express.Router();
// var Comments = require('../models/comments.js');

var comments = require('../api/comments')
var auth = require('../config/middleware/auth.js')


module.exports = router;