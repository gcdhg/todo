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
    name: "taskman5",
    username: "taskman5",
    email: "taskman5@gmail.com",
    password: "taskman5",
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
    await Task.deleteMany({ user: id });
    await User.deleteOne({
      username: user.username,
    });
    await database.close();
  });

  it("create user and get his data", async () => {
    // ? create user
    const res = await userFun.createUser(user);
    expect(res.status).toBe(201);
    // ? login user
    const login = await userFun.loginUser({
      email: user.email,
      password: user.password,
    });
    token = await login.json();
    // ? get user from db
    const userCreated = await User.findOne({
      username: user.username,
    });
    id = userCreated._id;
    await taskfun.createTask(token.token, {
      title: "new todo1",
    });
    await taskfun.createTask(token.token, {
      title: "new todo2",
    });
    await taskfun.createTask(token.token, {
      title: "new todo3",
    });
    // ? get all tasks
    let task = await taskfun.getAllPrivateTasks(token.token);
    expect(task.status).toBe(200);
    task = await task.json();
    expect(task[0]).toMatchObject({
      user: id.toString(),
      title: "new todo1",
    });
    expect(task[1]).toMatchObject({
      user: id.toString(),
      title: "new todo2",
    });
    expect(task[2]).toMatchObject({
      user: id.toString(),
      title: "new todo3",
    });
  });
});
