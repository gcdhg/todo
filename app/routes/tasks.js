const express = require("express");
const router = express.Router();

const Todo = require("../models/tasks.js");
const User = require("../models/user.js");
const Project = require("../models/projects.js");

const tasks = require("../api/tasks");
const auth = require("../config/middleware/auth.js");

router.get("/get", auth, tasks.showAllPrivateTasks);
router.post("/create", auth, tasks.createTask);
router.put("/state/:id", auth, tasks.changeState);

router.get("/:id", auth, tasks.getTaskById);
router.put("/:id", auth, tasks.editTask);
router.delete("/:id", auth, tasks.deleteTask);

module.exports = router;
