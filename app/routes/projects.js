const express = require("express");
const router = express.Router();

const Todo = require("@Models/tasks.js");
const User = require("@Models/user.js");
const Project = require("@Models/projects.js");

const projects = require("@Api/projects");

const auth = require("@Middleware/auth.js");
const entity = require("@Middleware/entity");

const middle = [auth, entity];

router.get("/all", middle, projects.getUserProjects);
router.get("/:project", middle, projects.getOneProject);
router.post("/create", middle, projects.createProject);
router.patch("/edit", middle, projects.editOneProject);
router.delete("/delete", middle, projects.deleteProject);

module.exports = router;
