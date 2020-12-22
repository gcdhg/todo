var express = require("express");
var router = express.Router();

var Todo = require("../models/tasks.js");
var User = require("../models/user.js");
var Project = require("../models/projects.js");

var tasks = require("../api/tasks");
var auth = require("../config/middleware/auth.js");
var privilage = require("../config/middleware/privilage.js");

const middle = [auth, privilage];

router.get("/get", auth, tasks.showAllPrivateTasks);
router.get("/:id", middle, tasks.getTaskById);

router.post("/create", middle, tasks.createTask);

router.put("/:id", middle, tasks.editTask);
router.put("/state/:id", middle, tasks.changeState);

router.delete("/:id", middle, tasks.deleteTask);

module.exports = router;
