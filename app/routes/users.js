const express = require("express");
const router = express.Router();

const Todo = require("@Models/tasks.js");
const User = require("@Models/user.js");
const Project = require("@Models/projects.js");

const userApi = require("@Api/user");
const auth = require("@Middleware/auth.js");

router.post("/create", userApi.createUser);
router.post("/login", userApi.loginUser);
router.delete("/logout", auth, userApi.logoutUserOnce);
router.put("/logout/all", auth, userApi.logoutUserOnAllDevices);
router.delete("/delete", auth, userApi.deleteUser);
router.get("/id/:id", auth, userApi.getUserById);
router.get("/token", auth, userApi.getUserByToken);
router.get("/username/:username", auth, userApi.getUserByUsername);

module.exports = router;
