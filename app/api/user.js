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
      const user = new User(req.body);
      await user.save();
      res.status(201).json({ token: user.tokens });
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
      // console.log(fel);
      const status = 201;
      res.status(status).json();
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

  async getUser(req, res) {
    try {
      const [user, token] = [req.user, req.token];
      const foundUser = await (await User.findOne({ username: req.params.id }))
        .populate("tasks")
        .populated("projects")
        .exec();
      const { _id: id, name, surname, email, tasks, projects } = foundUser;
      const isGuest = user === foundUser._id;
      const mapping = {
        true: { id, name, surname },
        false: { ...this.true, email, tasks, projects },
      };
      const result = mapping[isGuest];
      res.status(200).json(result);
    } catch (err) {
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
      const isUser = !user;
      const status = isUser ? 400 : 200;
      const result = mapping[isUser];
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
