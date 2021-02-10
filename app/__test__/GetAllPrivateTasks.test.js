const dotenv = require("dotenv").config();

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userFun = require("./fetchers/user");
const taskFun = require("./fetchers/task");

const User = mongoose.model("User");
const Task = mongoose.model("Task");

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
      const task = taskFun.createTask(token, {
        title: "new todo private tasks",
      });
      arr = [...arr, task];
    }
    await Promise.all(arr);
    const statusCreateTask = await taskFun.getAllPrivateTasks(token);
    expect(statusCreateTask.status).toBe(200);
    const json = await statusCreateTask.json();
    const userDB = await User.findOne({
      username: user.username,
    });
    expect(userDB.tasks).toEqual(expect.arrayContaining(json.tasks));
  });
});
