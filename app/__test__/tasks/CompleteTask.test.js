const dotenv = require("dotenv").config();

const userFun = require("../fetchers/user");
const taskfun = require("../fetchers/task");
const projFun = require("../fetchers/project");

const mongoose = require("mongoose");

const Project = require("../../models/projects");
const User = require("../../models/user");
const Task = require("../../models/tasks");

// const fetch = require("node-fetch");

describe("TODO", () => {
  let database;
  let token;
  let id;

  const user = {
    name: "taskman32",
    username: "taskman32",
    email: "taskman32@gmail.com",
    password: "taskman32",
  };

  beforeAll(async () => {
    database = mongoose.connection;

    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    database.on("error", (error) =>
      console.log(`Connection to database failed: ${error}`)
    );
    database.on("connected", () => console.log("Connected to database"));
  });

  afterAll(async () => {
    await User.deleteOne({
      email: user.email,
    });
    await Task.deleteMany({ user: id });
    await database.close();
  });

  it("create user and get all his private tasks", async () => {
    await userFun.createUser(user);
    const login = await userFun.loginUser({
      email: user.email,
      password: user.password,
    });
    const dbUser = await User.findOne({ email: user.email });
    id = dbUser._id;
    token = await login.json();
    token = token.token;
    /**
     * create task
     */
    let task = await taskfun.createTask(token, {
      title: "new todo private tasks",
    });
    expect(task.status).toBe(201);
    task = await task.json();

    let complete = await taskfun.completeTask(token, task._id);
    expect(complete.status).toBe(201);
    const dbT = await Task.findById(task._id);
    expect(dbT.isComleted).toBeTruthy();
  });
});
