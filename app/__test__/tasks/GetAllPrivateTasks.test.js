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
    name: "taskman",
    username: "taskman",
    email: "taskman@gmail.com",
    password: "taskman",
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
    let arr = [];
    for (let i = 0; i < 3; i += 1) {
      const task = await taskfun.createTask(token, {
        title: "new todo private tasks",
      });
      expect(task.status).toBe(201);
    }
    // ? get all tasks
    const statusCreateTask = await taskfun.getAllPrivateTasks(token);
    expect(statusCreateTask.status).toBe(200);
    const json = await statusCreateTask.json();
    const userDB = await User.findOne({
      username: user.username,
    }).populate([
      {
        path: "tasks",
        model: "Task",
      },
    ]);
    // console.log(json);
    const tasks = json.map((i) => i._id);
    const dbIds = userDB.tasks.map((i) => i._id);
    expect(dbIds.join("").toString()).toBe(tasks.join("").toString());
  });
});
