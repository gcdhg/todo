const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
const userFun = require("./fetchers/user");
const taskfun = require("./fetchers/task");

const Project = mongoose.model("Project");
const Task = mongoose.model("Task");
const User = mongoose.model("User");

// const fetch = require("node-fetch");

describe("TODO", () => {
  let database;
  let token;

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
    await Task.deleteMany();
    await database.close();
  });

  it("create user and create, edit, delete todo", async () => {
    // ? create user
    await userFun.createUser(user);
    // ? login user
    const statusLogin = await userFun.loginUser({
      email: user.email,
      password: user.password,
    });
    const tokenLogin = await statusLogin.json();
    // ? create task
    const newTodoReq = await taskfun.createTask(tokenLogin.token, {
      title: "new todo",
    });
    const createdTask = await Task.find({ title: "new todo" });
    expect(newTodoReq.status).toBe(201);
    expect(createdTask).toMatchObject([{ title: "new todo" }]);
    // ? edit Task
    const editTask = await taskfun.editTask(
      tokenLogin.token,
      createdTask[0]._id,
      {
        title: "very new todo",
      }
    );
    expect(editTask.status).toBe(201);
    // ? get Task by id
    const newTask = await newTodoReq.json();
    const getTaskById = await taskfun.getTaskById(
      tokenLogin.token,
      newTask._id
    );
    expect(getTaskById.status).toBe(200);
    const getTask = await getTaskById.json();
    expect(getTask).toMatchObject(newTask);
    // ? delete Task
    const deleteTask = await taskfun.deleteTask(
      tokenLogin.token,
      createdTask[0]._id
    );
    expect(deleteTask.status).toBe(201);
  });
});
