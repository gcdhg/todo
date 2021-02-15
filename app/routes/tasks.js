const express = require("express");
const router = express.Router();

const Todo = require("@Models/tasks.js");
const User = require("@Models/user.js");
const Project = require("@Models/projects.js");

const tasks = require("@Api/tasks");
const auth = require("@Middleware/auth.js");
const entity = require("@Middleware/entity");

const middle = [auth, entity];

router.get("/get", middle, tasks.getAllPrivateTasks);
router.post("/create", middle, tasks.createTask);
router.put("/state/:id", middle, tasks.changeState);

router.get("/:id", middle, tasks.getTaskById);
router.put("/:id", middle, tasks.editTask);
router.delete("/:id", middle, tasks.deleteTask);

module.exports = router;
