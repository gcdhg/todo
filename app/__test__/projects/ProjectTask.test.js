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
    name: "projectman11",
    username: "projectman11",
    email: "projectman11@gmail.com",
    password: "projectman11",
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
      title: "new project",
    });
    const dbProject = await Project.find({ title: "new project" });
    expect(project.status).toBe(201);

    project = await project.json();
    /**
     * ? check that project is recorded in user
     */
    let projectRecord = await userFun.getUserByToken({ token });
    /**
     * ? check status
     */
    expect(projectRecord.status).toBe(200);
    /**
     * ? check data user
     */
    projectRecord = await projectRecord.json();
    expect(projectRecord.projects).toHaveLength(1);
    expect(projectRecord.projects[0]).toEqual(project._id);

    /**
     * ? get user projects
     */
    let projects = await projFun.getUserProjects(token);
    expect(projects.status).toBe(200);
    projects = await projects.json();
    /**
     * ? create project task
     */
    // console.log(projects);
    let taskP = await taskfun.createTask(token, {
      title: "project task",
      project: projects[0]._id,
    });
    expect(taskP.status).toBe(201);
    taskP = await taskP.json();
    /**
     * ? check that task is recorded in project
     */
    let checkProject = await projFun.getOneprojectById(token, projects[0]._id);
    expect(checkProject.status).toBe(200);
    checkProject = await checkProject.json();
    /**
     * ? check data project
     */
    expect(checkProject.tasks).toHaveLength(1);
    expect(checkProject.tasks[0]._id).toEqual(taskP._id);
    /**
     * ? check that tasks recorded in user
     */
    let checkTasks = await userFun.getUserByToken({ token });
    /**
     * ? check status
     */
    expect(checkTasks.status).toBe(200);
    /**
     * ? check data user
     */
    checkTasks = await checkTasks.json();
    expect(checkTasks.tasks).toHaveLength(1);
    expect(checkTasks.tasks[0]).toEqual(taskP._id);
  });
});
