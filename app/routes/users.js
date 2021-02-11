const express = require("express");
const router = express.Router();

const Todo = require("@Models/tasks.js");
const User = require("@Models/user.js");
const Project = require("@Models/projects.js");

const userApi = require("../api/user");
const auth = require("../config/middleware/auth.js");

router.post("/create", userApi.createUser);
router.post("/find", auth, userApi.findUserByUsername);
router.post("/login", userApi.loginUser);
router.delete("/logout", auth, userApi.logoutUserOnce);
router.put("/logout/all", auth, userApi.logoutUserOnAllDevices);
router.delete("/delete", auth, userApi.deleteUser);
router.get("/bytoken", auth, userApi.getUserByToken);
router.get("/:id", auth, userApi.getUser);

module.exports = router;
