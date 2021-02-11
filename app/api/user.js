const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

const User = mongoose.model("User");
const Task = mongoose.model("Task");
const Project = mongoose.model("Project");

const Schema = mongoose.Schema;

module.exports = {
  async createUser(req, res) {
    try {
      const { name, surname, username, email, password } = req.body;
      const user = new User({ name, surname, username, email, password });
      await user.save();
      res.status(201).json({ status: "user created" });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByRecords(email, password);
      const token = await user.generateAuthToken();

      req.session.userid = user._id;
      req.session.token = token;
      res.status(200).json({
        username: user.username,
        token: token,
      });
    } catch (err) {
      // console.log(err);
      res.status(401).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByRecords(email, password);

      const isDeleted = User.deleteOne({ email: user.email });
      const task = Task.deleteMany({ user: user._id });
      const project = Project.deleteMany({ owner: user._id });

      const fel = await Promise.all([task, project, isDeleted]);
      res.status(201).json();
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // async updateUserData(req, res) {
  //   try {
  //     const { name, surname, username, email, password } = req.body;
  //   } catch (err) {
  //     console.log(err);
  //     res.status(400).json();
  //   }
  // },

  async logoutUserOnce(req, res) {
    try {
      const token = _.has(req.body, "token") ? req.body.token : req.token;
      const id = req.user;
      const isDestroied = await User.destroyToken(id, token);
      const status = isDestroied ? 201 : 400;
      res.status(status).json();
    } catch (err) {
      // console.log(err);
      res.status(401).json("logout failed");
    }
  },

  async getUserByToken(req, res) {
    try {
      // console.log(req.token);
      const user = await User.findById(req.user);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(404).json();
    }
  },

  async getUser(req, res) {
    try {
      const [user, token] = [req.user, req.token];

      const foundUser = await User.findOne({ username: req.user });
      // .populate([
      //   {
      //     path: "projects",
      //     model: "Project",
      //     populate: [
      //       {
      //         path: "tasks",
      //         model: "Task",
      //       },
      //       {
      //         path: "participants.user",
      //         model: "User",
      //         select: "username",
      //       },
      //     ],
      //   },
      //   {
      //     path: "tasks",
      //     model: "Task",
      //   },
      // ])
      // .exec();
      const { _id: id, name, surname, email, tasks, projects } = foundUser;
      const isGuest = user === foundUser._id;
      const mapping = {
        true: { id, name, surname },
        false: { ...this.true, email, tasks, projects },
      };
      const result = mapping[isGuest];
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(404).json();
    }
  },

  async findUserByUsername(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      const { _id: id, name, surname } = user;
      const mapping = {
        false: { id, name, surname },
        true: {},
      };
      const status = !user ? 400 : 200;
      const result = mapping[!user];
      res.status(status).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json("operation failed");
    }
  },

  async logoutUserOnAllDevices(req, res) {
    try {
      const [token, id] = [req.token, req.user];

      const isDestroied = await User.destroyAllTokens(id, token);
      const status = isDestroied ? 201 : 400;
      res.status(status).json();
    } catch (err) {
      console.log(err);
      res.status(400).json("logout failed");
    }
  },
};
