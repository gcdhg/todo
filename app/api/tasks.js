const mongoose = require("mongoose");
const { wrap: async } = require("co");
const { NotExtended } = require("http-errors");

const Task = mongoose.model("Task");
const User = mongoose.model("User");
const Project = mongoose.model("Project");

/**
 * Create task if user owns project or it's his private task
 **/
module.exports.createTask = async function (req, res) {
  try {
    const { title, planedAt, projectId } = req.body;
    const task = new Task({ title, planedAt, user: req.user, projectId });

    await task.save();

    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

/**
 * Get all tasks created by user (including once in owned project)
 */

module.exports.showAllPrivateTasks = async function (req, res) {
  try {
    const user = await User.findById(req.user).populate("tasks").exec();
    const { tasks, _id: userId, username } = user;
    const mapping = {
      true: {},
      false: { tasks, userId, username },
    };
    const status = user !== undefined ? 200 : 400;
    res.status(status).json(mapping[!user]);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

/**
 * Get Task by id and if it's private task user can edit it
 * and if it's project task he can comment it
 */

module.exports.getTaskById = async function (req, res) {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user,
      projectId: req.body.projectId,
    });
    const status = task === undefined ? 402 : 200;
    res.status(status).json(task);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

module.exports.editTask = async function (req, res) {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user,
      projectId: req.body.projectId,
    });
    for (let key of Object.keys(req.body)) {
      task[key] = req.body[key];
    }
    await task.save();

    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports.deleteTask = async function (req, res) {
  try {
    const user = await User.findById(req.user);
    const { tasks, owner } = user;
    const task = await Task.findById(req.params.id);
    const isPrivate = task.user.toString() === req.user.toString();
    const isProject = owner
      ? owner.some((p) => req.body?.projectId === p)
      : false;
    const isValid = isPrivate || isProject;
    if (isValid) {
      const task = await Task.deleteOne({
        _id: req.params.id,
        project: req.body?.project,
        user: req.user,
      });
      res.status(201).json(task);
    } else {
      res.status(402).json();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

module.exports.changeState = async function (req, res) {
  try {
    const user = await User.findById(req.user);
    const { tasks, owner, projects } = user;
    const isPrivate = req.params.id === user._id;
    const isProjectOwner = owner.some((p) => req.body?.projectId === p);
    const isProjectWorker = projects.some((p) => req.body?.projectId === p);
    const isValid = isPrivate || isProjectOwner || isProjectWorker;
    if (isValid) {
      const task = await Task.findOne({
        _id: req.params.id,
        project: req.body?.project,
        user: req.user,
      });
      task.state = req.body.state;
      res.status(201).json(task);
    } else {
      res.status(402).json();
    }
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};
