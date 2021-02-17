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
  let id;

  const user = {
    name: "projectman222",
    username: "projectman222",
    email: "projectman222@gmail.com",
    password: "projectman222",
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
    /**
     * ? check status
     */
    await userFun.createUser(user);
    const dbUser = await User.findOne({
      username: user.username,
    });
    /**
     * ? get user id
     */
    id = dbUser._id;
    /**
     * ? login user
     */
    let token = await userFun.loginUser({
      email: user.email,
      password: user.password,
    });
    token = await token.json();
    /**
     * ? get token
     */
    token = token.token;
    /**
     * ? create project
     */
    let project = await projFun.createProject(token, {
      title: "my new projecct",
    });
    const dbProject = await Project.find({ title: "my new projecct" });
    expect(project.status).toBe(201);

    project = await project.json();
    /**
     * ? get user projects
     */
    let projects = await projFun.getUserProjects(token);
    expect(projects.status).toBe(200);
    projects = await projects.json();
    /**
     * ? check recived array length
     */
    expect(projects).toHaveLength(1);
    /**
     * ? check that data is valid
     */
    expect(projects[0]).toMatchObject(project);
    /**
     * ? create task in Project
     */
    let task = await taskfun.createTask(token, {
      title: "my new projecct task",
      project: project._id,
    });
    /**
     * ? check status
     */
    expect(task.status).toBe(201);
    task = await task.json();
    /**
     * ? get project data
     */
    let oneProject = await projFun.getOneprojectById(token, project._id);
    /**
     * ? check status
     */
    expect(oneProject.status).toBe(200);
    oneProject = await oneProject.json();

    expect(oneProject).toMatchObject({
      title: "my new projecct",
    });
    // ? delete Project without valid user data
    const deleteProjectWithFakeData = await projFun.deleteProject(token);
    /**
     * ? check status
     */
    expect(deleteProjectWithFakeData.status).toBe(403);
    /**
     * ? delete Project with valid user data
     */
    const deleteProject = await projFun.deleteProject(token, dbProject[0]._id);
    /**
     * ? check status
     */
    expect(deleteProject.status).toBe(201);
  });
});
