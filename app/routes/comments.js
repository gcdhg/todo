const express = require("express");
const router = express.Router();

const Todo = require("../models/tasks.js");
const User = require("../models/user.js");
const Project = require("../models/projects.js");
// const Comments = require('../models/comments.js');

const comments = require("../api/comments");
const auth = require("../config/middleware/auth.js");

module.exports = router;
