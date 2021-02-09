const express = require("express");
const router = express.Router();

const Todo = require("../models/tasks.js");
const User = require("../models/user.js");
const Project = require("../models/projects.js");

const projects = require("../api/projects");

const auth = require("../config/middleware/auth.js");

router.get("/get", auth, projects.getUserProject);
router.get("/:project", auth, projects.getOneProject);

router.post("/create", auth, projects.createProject);

// router.put("/add", auth, projects.addUserToProject);
router.patch("/edit", auth, projects.editOneProject);

router.delete("/delete", auth, projects.deleteProject);

module.exports = router;
