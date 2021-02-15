const mongoose = require("mongoose");
const _ = require("lodash");

const User = mongoose.model("User");
const Task = mongoose.model("Task");

/**
 * Create task if user owns project or it's his private task
 **/
module.exports.createTask = async function (req, res, next) {
  try {
    const user = req.currentUser;
    const { title, planedAt, projectId: project } = req.body;
    const task = await user.createTask({
      title,
      planedAt,
      project,
    });
    res.status(201).json(task);
  } catch (err) {
    // console.log(JSON.stringify(err, null, 2));
    console.log(err);
    err.status = err.status || 400;
    next(err);
  }
};

/**
 * Get all tasks created by user (including those in owned project)
 */

module.exports.showAllPrivateTasks = async function (req, res, next) {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
};

/**
 * Get Task by id and if it's private task user can edit it
 * and if it's project task he can comment it
 */

module.exports.getTaskById = async function (req, res, next) {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
      // projectId: req.body.projectId,
    });
    const status = task === undefined ? 402 : 200;
    res.status(status).json(task);
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
};

/**
 * Edit task if user owns project or it's his private task
 **/

module.exports.editTask = async function (req, res, next) {
  try {
    const user = req.currentUser;
    const task = user.editTask(req.params.id, req.body);
    res.status(201).json(task);
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
};

/**
 * Delete task if user owns project or it's his private task
 **/

module.exports.deleteTask = async function (req, res, next) {
  try {
    const user = req.currentUser;
    await user.deleteTask(req.params.id);
    res.status(201).json();
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
};

/**
 * Change task state
 **/

module.exports.changeState = async function (req, res, next) {
  try {
    const user = req.currentUser;
    const task = await user.CompleteTask(req.params.id);
    res.status(201).json(task);
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
};
