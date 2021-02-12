const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
const userFun = require("../fetchers/user");
const taskfun = require("../fetchers/task");
const projFun = require("../fetchers/project");

const Project = mongoose.model("Project");
const Task = mongoose.model("Task");
const User = mongoose.model("User");

// const fetch = require("node-fetch");

describe("TODO", () => {
  let database;
  let token;
  let id;

  const user = {
    name: "projectman1",
    username: "projectman1",
    email: "projectman1@gmail.com",
    password: "projectman1",
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
    await Project.deleteMany({
      owner: id,
    });
    await Task.deleteMany({
      user: id,
    });
    await database.close();
  });

  it("create user and create, edit, delete todo", async () => {
    // ? create user
    await userFun.createUser(user);
    const dbUser = await User.findOne({
      username: user.username,
    });
    // ? get user id
    id = dbUser._id;
    // ? login user
    let token = await userFun.loginUser({
      email: user.email,
      password: user.password,
    });
    token = await token.json();
    // ? get token
    token = token.token;
    // ? create project
    let project = await projFun.createProject(token, {
      title: "new project",
    });
    const dbProject = await Project.find({ title: "new project" });
    expect(project.status).toBe(201);

    project = await project.json();
    // ? get user projects
    let projects = await projFun.getUserProjects(token);
    expect(projects.status).toBe(200);
    projects = await projects.json();
    expect(projects).toHaveLength(1);
    expect(projects[0]).toMatchObject(project);
    // ? create task in Project
    let task = await taskfun.createTask(token, {
      title: "new project task",
      project: project._id,
    });
    expect(task.status).toBe(201);
    task = await task.json();
    // ? get project data
    let oneProject = await projFun.getOneprojectById(token, project._id);
    expect(oneProject.status).toBe(200);
    oneProject = await oneProject.json();
    expect(oneProject).toMatchObject({
      title: "new project",
    });
    // ? delete Project
    const deleteProject = await projFun.deleteProject(token, dbProject[0]._id);
    expect(deleteProject.status).toBe(201);
  });
});
