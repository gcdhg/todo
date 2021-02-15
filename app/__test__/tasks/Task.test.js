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
    name: "todoman",
    username: "todoman",
    email: "todoman@gmail.com",
    password: "todoman",
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

  it("create user and create, edit, delete todo", async () => {
    /**
     * ? check status
     */
    await userFun.createUser(user);
    /**
     * ? get user id
     */
    const dbUser = await User.findOne({ username: user.username });
    id = dbUser._id;
    /**
     * ? login user
     */
    token = await userFun.loginUser({
      email: user.email,
      password: user.password,
    });
    /**
     * ? get token
     */
    token = await token.json();
    /**
     * ? create task
     */
    let newTask = await taskfun.createTask(token.token, {
      title: "new todo",
    });
    const taskBD = await Task.findOne({ title: "new todo" });
    expect(newTask.status).toBe(201);
    newTask = await newTask.json();
    expect(taskBD).toMatchObject({ title: "new todo" });
    /**
     * ? edit task
     */
    let editTask = await taskfun.editTask(token.token, taskBD._id, {
      title: "very new todo",
    });
    // console.log("return fron taskendit method", await editTask.json());
    expect(editTask.status).toBe(201);
    editTask = await editTask.json();

    /**
     * ? get Task by id
     */
    const getTaskById = await taskfun.getTaskById(token.token, newTask._id);
    /**
     * ? check status
     */
    expect(getTaskById.status).toBe(200);
    const getTask = await getTaskById.json();
    /**
     * ? check that data was changed
     */
    expect(getTask).toMatchObject({ title: "very new todo" });
    /**
     * ? delete Task
     */
    const deleteTask = await taskfun.deleteTask(token.token, taskBD._id);
    /**
     * ? check status
     */
    expect(deleteTask.status).toBe(201);
  });
});
