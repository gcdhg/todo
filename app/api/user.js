const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

const User = mongoose.model("User");
const Task = mongoose.model("Task");
const Project = mongoose.model("Project");

module.exports = {
  /**
   * Create user. Get data from requst body and store it in database
   */

  async createUser(req, res, next) {
    try {
      const { name, surname, username, email, password } = req.body;
      const user = new User({ name, surname, username, email, password });
      await user.save();
      res.status(201).json({ status: "user created" });
    } catch (err) {
      err.status = err.status || 422;
      next(err);
    }
  },

  /**
   * Check that credetials is valid.
   * Generate token and store it in database.
   * Sends it to client
   */

  async loginUser(req, res, next) {
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
      err.status = err.status || 401;
      next(err);
    }
  },

  /**
   * Check that credetials is valid.
   * Find all user Tasks and delete
   * Find all user Projects and delete
   * Find user and delete
   */

  async deleteUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findByRecords(email, password);

      const isDeleted = User.deleteOne({ email: user.email });
      const task = Task.deleteMany({ user: user._id });
      const project = Project.deleteMany({ owner: user._id });

      const fel = await Promise.all([task, project, isDeleted]);
      res.status(201).json();
    } catch (err) {
      err.status = err.status || 400;
      next(err);
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

  /**
   *
   * Check if there is any tokens in request body
   * if it's in body find it in user data and delete it
   * if there is no token in body then delete token used to auth in the request
   */

  async logoutUserOnce(req, res, next) {
    try {
      const token = _.has(req.body, "token") ? req.body.token : req.token;
      const id = req.user;
      const isDestroied = await User.destroyToken(id, token);
      const status = isDestroied ? 201 : 400;
      res.status(status).json();
    } catch (err) {
      err.status = err.status || 401;
      next(err);
    }
  },

  /**
   * Get user data from database by his _id
   * user _id parsed from token
   * and then full user data returned in response
   */

  async getUserById(req, res, next) {
    try {
      // console.log(req.token);
      const user = await User.findById({ _id: req.params.id });
      res.status(200).json(user);
    } catch (err) {
      err.status = err.status || 404;
      next(err);
    }
  },

  /**
   * Get user data from database by his _id
   * user _id parsed from token
   * and then full user data returned in response
   */

  async getUserByToken(req, res, next) {
    try {
      // console.log(req.token);
      const user = await User.findById(req.user);
      res.status(200).json(user);
    } catch (err) {
      err.status = err.status || 404;
      next(err);
    }
  },

  /**
   * Find user in database using his unique username
   * if targeted user === curent(the one who made request)
   * then behaves like getUserById
   */

  async getUserByUsername(req, res, next) {
    try {
      const user = req.user;

      const foundUser = await User.findOne({ username: req.params.username });
      const {
        _id: id,
        name,
        surname,
        username,
        email,
        tasks,
        projects,
      } = foundUser;
      const isGuest = user === id;
      const mapping = {
        true: { id, username },
        false: {
          ...this.true,
          name,
          surname,
          username,
          email,
          tasks,
          projects,
        },
      };
      const result = mapping[isGuest];
      res.status(200).json(result);
    } catch (err) {
      err.status = err.status || 404;
      next(err);
    }
  },

  /**
   * Finds user and deletes all tokens
   */

  async logoutUserOnAllDevices(req, res, next) {
    try {
      const [token, id] = [req.token, req.user];

      const isDestroied = await User.destroyAllTokens(id, token);
      const status = isDestroied ? 201 : 400;
      res.status(status).json();
    } catch (err) {
      err.status = err.status || 400;
      next(err);
    }
  },
};
