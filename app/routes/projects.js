const express = require("express");
const router = express.Router();

const Todo = require("@Models/tasks.js");
const User = require("@Models/user.js");
const Project = require("@Models/projects.js");

const projects = require("../api/projects");

const auth = require("../config/middleware/auth.js");

router.get("/all", auth, projects.getUserProjects);
router.get("/:project", auth, projects.getOneProject);
router.post("/create", auth, projects.createProject);
router.patch("/edit", auth, projects.editOneProject);
router.delete("/delete", auth, projects.deleteProject);

module.exports = router;
