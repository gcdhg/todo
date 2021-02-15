const mongoose = require("mongoose");

const User = mongoose.model("User");
const Task = mongoose.model("Task");
const Project = mongoose.model("Project");

module.exports.getUserProjects = async function (req, res, next) {
  try {
    const projects = await Project.find({ owner: req.user._id });
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
      "contributors.user": req.user._id,
    })
      .populate([
        {
          path: "tasks",
          model: "Task",
        },
        // {
        //   path: "contributors.user",
        //   model: "User",
        //   select: "username",
        // },
        // {
        //   path: "owner",
        //   model: "User",
        //   select: "username",
        // },
      ])
      .exec();
    res.status(200).json(project);
  } catch (err) {
    err.status = err.status || 404;
    next(err);
  }
};

module.exports.editOneProject = async function (req, res, next) {
  try {
    const user = req.currentUser;
    const { projectId, title } = req.body;
    const project = await user.editProject(projectId, { title });
    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    err.status = err.status || 404;
    next(err);
  }
};

module.exports.createProject = async function (req, res, next) {
  // req.user && req.token
  try {
    const user = req.currentUser;
    const { title } = req.body;
    const project = await user.createProject({
      title,
      owner: req.user._id,
      contributors: [{ user: req.user._id, role: "owner" }],
      tasks: [],
    });
    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    err.status = err.status || 400;
    next(err);
  }
};

module.exports.deleteProject = async function (req, res, next) {
  try {
    const user = req.currentUser;
    await user.deleteProject(req.body.projectId);
    res.status(201).json();
  } catch (err) {
    // console.log(err);
    err.status = err.status ?? 403;
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
