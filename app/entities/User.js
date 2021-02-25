// const Task = require("@Models/tasks");
const Task = require("../models/tasks");
const Project = require("../models/projects");

class User {
  constructor(user) {
    this.user = user;
  }
  async createTask(newTask) {
    try {
      const task = new Task({ ...newTask, user: this.user._id });
      await task.save();
      return task;
    } catch (err) {
      err.status = 422;
      throw err;
    }
  }
  async editTask(id, newTask) {
    try {
      console.log(newTask);
      const task = await Task.findOneAndUpdate(
        {
          _id: id,
          user: this.user._id,
          // project: req.body?.projectId,
        },
        { $set: newTask },
        { new: true }
      );
      return task;
    } catch (err) {
      err.status = 422;
      throw err;
    }
  }
  async CompleteTask(id) {
    try {
      const task = await Task.findById(id);
      await Task.findByIdAndUpdate(
        id,
        {
          $set: { isComleted: !task.isComleted },
        },
        {
          new: true,
        }
      );
      return task;
    } catch (err) {
      err.status = 404;
      throw err;
    }
  }
  async deleteTask(id) {
    try {
      await Task.findByIdAndDelete(id);
    } catch (err) {
      err.status = 404;
      throw err;
    }
  }
  async createProject(newProject) {
    try {
      const project = new Project(newProject);
      await project.save();
      return project;
    } catch (err) {
      err.status = 422;
      throw err;
    }
  }
  // async deleteProject(id) {
  //   throw new Error({ status: 403 });
  // }
  // async editProject(id, newProject) {
  //   throw new Error({ status: 403 });
  // }
}

module.exports = User;
