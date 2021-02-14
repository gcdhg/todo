const mongoose = require("mongoose");

const Task = require("@Models/tasks");
const Project = require("@Models/projects");
const User = require("@Models/user");

// const Project = mongoose.model("Project");
// const User = mongoose.model("User");

module.exports.getUserProjects = async function (req, res, next) {
  try {
    const projects = await Project.find({ owner: req.user });
    const status = !projects ? 400 : 200;
    res.status(status).json(projects || {});
  } catch (err) {
    err.status = err.status || 404;
    next(err);
  }
};

module.exports.getOneProject = async function (req, res, next) {
  try {
    const project = await Project.findOne({
      _id: req.params.project,
      "contributors.user": req.user,
    })
      // .populate([
      //   {
      //     path: "tasks",
      //     model: "Task",
      //   },
      //   {
      //     path: "participants.user",
      //     model: "User",
      //     select: "username",
      //   },
      //   {
      //     path: "owner",
      //     model: "User",
      //     select: "username",
      //   },
      // ])
      // .exec();
    res.status(200).json(project);
  } catch (err) {
    err.status = err.status || 404;
    next(err);
  }
};

module.exports.editOneProject = async function (req, res) {
  try {
    const project = await Project.findByIdAndUpdate(req.body.projectId, {
      title: req.body.title,
    });
    res.status(201).json(project);
  } catch (err) {
    err.status = err.status || 404;
    next(err);
  }
};

module.exports.createProject = async function (req, res) {
  // req.user && req.token
  try {
    const user = req.user;
    const { title } = req.body;
    const userProm = User.findById(req.user);
    const project = new Project({
      title,
      owner: user,
      contributors: [{ user, role: "owner" }],
      tasks: [],
    });
    const saveProject = project.save();
    const [userUpd] = await Promise.all([userProm, saveProject]);
    userUpd.owned = [...userUpd.owned, project._id];
    await userUpd.save();
    res.status(201).json(project);
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
};

module.exports.deleteProject = async function (req, res) {
  try {
    const user = await User.findById(req.user);
    const { owned } = user;
    isOwner = owned.some((p) => req.body.projectId === p);
    if (isOwner) {
      const userMod = user.owned
        .splice(owned.indexOf(req.body.projectId), 1)
        .save();
      const taskdel = Task.deleteMany({ project: req.body.projectId });
      const projdel = Project.deleteOne({ _id: req.body.projectId });
      await Promise.all([taskdel, projdel, userMod]);
    }
    res.status(201).json();
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
};

// module.exports.addUserToProject = async function (req, res) {
//   try {
//     const user = await User.findById(req.user);
//     const { owned } = user;
//     isOwner = owned.some((p) => req.body.projectId === p);
//     if (isOwner) {
//       const result = await Project.addUserToProject(
//         req.body.projectId,
//         req.body.newUser
//       );
//       res.status(201).json();
//     } else {
//       res.status(400).json("user adding failed");
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).json("user adding failed");
//   }
// };
