const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
const userFun = require("./fetchers/user");
const taskfun = require("./fetchers/task");
const projFun = require('./fetchers/project')

const Project = mongoose.model("Project");
const Task = mongoose.model("Task");
const User = mongoose.model("User");

// const fetch = require("node-fetch");

describe("TODO", () => {
  let database;
  let token;

  const user = {
    name: "todoman3",
    username: "todoman3",
    email: "todoma3n@gmail.com",
    password: "todo4man",
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
    await Project.deleteMany();
  });

  it("create user and create, edit, delete todo", async () => {
    // ? create user
    const statusCreateUser = await userFun.createUser(user);
    const userCreated = await User.findOne({
      username: user.username,
    });
    // ? login user
    const statusLogin = await userFun.loginUser({
      email: user.email,
      password: user.password,
    });
    const tokenLogin = await statusLogin.json();
    // ? create project
    const newProjReq = await projFun.createProject(tokenLogin.token, {
      title: "new project",
    });
    const createdProject = await Project.find({ title: "new project" });
    expect(newProjReq.status).toBe(201);
    expect(createdProject).toMatchObject([{ title: "new project" }]);
    // ? edit Project
    const editTask = await projFun.editOneprojectById(
      tokenLogin.token,
      createdProject[0]._id,
      {
        title: "very new todo",
      }
    );
    expect(editTask.status).toBe(201);
    // ? get Project by id
    const newProj = await newProjReq.json();
    const getProjById = await projFun.getOneprojectById(
      tokenLogin.token,
      newProj._id
    );
    expect(getProjById.status).toBe(200);
    // ? delete Task
    const deleteProject = await projFun.deleteProject(
      tokenLogin.token,
      newProj._id
    );
    expect(deleteProject.status).toBe(201);
  });
});
