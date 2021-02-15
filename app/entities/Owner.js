const PlainUser = require("./User");
const Project = require("../models/projects");
const Task = require("../models/tasks");

class Owner extends PlainUser {
  // async createTask(newTask) {
  //   const task = await super.createTask(newTask);
  //   await Project.findByIdAndUpdate(newTask.project, {
  //     $push: {
  //       tasks: task._id,
  //     },
  //   });
  //   return task;
  // }
  async deleteProject(id) {
    try {
      const promP = Project.findByIdAndDelete(id);
      const promT = Task.deleteMany({ project: id });
      this.user.projects = this.user.projects.filter((p) => p !== id);
      this.user.owned = this.user.owned.filter((p) => p !== id);
      await Promise.all([promP, promT, this.user.save()]);
    } catch (err) {
      err.status = 404;
      throw err;
    }
  }
  async editProject(id, newProject) {
    try {
      const project = await Project.findByIdAndUpdate(
        id,
        {
          $set: newProject,
        },
        {
          new: true,
        }
      );
      return project;
    } catch (err) {
      err.status = 404;
      throw err;
    }
  }
}

module.exports = Owner;
