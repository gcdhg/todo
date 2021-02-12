const mongoose = require("mongoose");
const Task = require("../models/tasks");

const Project = mongoose.model("Project");
const User = mongoose.model("User");

module.exports.getUserProject = async function (req, res) {
  try {
    const projects = await Project.find({ owner: req.user });
    const status = !projects ? 400 : 200;
    res.status(status).json(projects || {});
  } catch (err) {
    console.log(err);
    res.status(400).json("project not found");
  }
};

module.exports.getOneProject = async function (req, res) {
  try {
    const project = await Project.findOne({
      _id: req.params.project,
      "participants.user": req.user,
    })
      .populate([
        {
          path: "tasks",
          model: "Task",
        },
        {
          path: "participants.user",
          model: "User",
          select: "username",
        },
        {
          path: "owner",
          model: "User",
          select: "username",
        },
      ])
      .exec();
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(400).json("error");
  }
};

module.exports.editOneProject = async function (req, res) {
  try {
    const project = await Project.findByIdAndUpdate(req.body.projectId, {
      title: req.body.title,
    });
    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(400).json("error");
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
      participants: [{ user, role: "owner" }],
      tasks: [],
    });
    const saveProject = project.save();
    const [userUpd] = await Promise.all([userProm, saveProject]);
    userUpd.owned = [...userUpd.owned, project._id];
    await userUpd.save();
    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(400).json("project creation failed");
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
    console.log(err);
    res.status(400).json("project deletion failed");
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
