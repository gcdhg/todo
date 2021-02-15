const dotenv = require("dotenv").config();

const userFun = require("../fetchers/user");
const taskfun = require("../fetchers/task");
const projFun = require("../fetchers/project");

const mongoose = require("mongoose");

const Project = require("../../models/projects");
const User = require("../../models/user");
const Task = require("../../models/tasks");

describe("TODO", () => {
  let database;
  let token;

  const user = {
    name: "todoman1",
    username: "todoman1",
    email: "todoman1@gmail.com",
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
    await User.deleteMany({
      email: user.email,
    });
    await Project.deleteMany();

    await database.close();
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
    expect(createdProject[0]).toMatchObject({ title: "new project" });
    // ? edit Project
    const editProj = await projFun.editOneprojectById(tokenLogin.token, {
      projectId: createdProject[0]._id,
      title: "very new todo project",
    });
    expect(editProj.status).toBe(201);
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
