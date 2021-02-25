const dotenv = require("dotenv").config();

const userFun = require("../fetchers/user");
const taskfun = require("../fetchers/task");
const projFun = require("../fetchers/project");

const mongoose = require("mongoose");

const Project = require("../../models/projects");
const User = require("../../models/user");
const Task = require("../../models/tasks");

describe("User", () => {
  let database;
  let token;

  let user = {
    name: "marvin",
    username: "marvin",
    email: "marvin@gmail.com",
    password: "12345",
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
    await database.close();
  });

  it("create, login, update, delete, get, find, logout on all devices user", async () => {
    /**
     * ? create user
     */
    const statusCreateUser = await userFun.createUser(user);
    expect(statusCreateUser.status).toBe(201);
    const userCreated = await User.findOne({
      username: user.username,
    });
    expect(userCreated).toMatchObject({
      name: user.name,
      surname: user.surname,
      email: user.email,
    });
    /**
     * ? check login user
     */
    Array(3).map(async (t) => {
      const statusLogin = await userFun.loginUser({
        email: user.email,
        password: user.password,
      });
      expect(statusLogin.status).toBe(200);
      return statusLogin;
    });
    /**
     * ? login
     */
    const login = await userFun.loginUser({
      email: user.email,
      password: user.password,
    });
    const tokenl = await login.json();
    token = tokenl.token;
    // console.log(tokenl.session);
    // console.log(tokenl.locals);
    /**
     * ? login with false data
     */
    const statusLoginFalse = await userFun.loginUser({
      email: "wrongemail@email.com",
      password: "wrongpassword",
    });
    expect(statusLoginFalse.status).toBe(401);
    /**
     * ? logout on all devices
     */

    const logoutOnAllFetch = await userFun.logoutUserOnAllDevices(token);
    expect(logoutOnAllFetch.status).toBe(201);
    /**
     * ? check logout
     */
    const createTask = await taskfun.createTask(
      { token },
      {
        title: "must be falty",
      }
    );
    expect(createTask.status).toBe(401);
    /**
     * ? login
     */
    const statusLogin = await userFun.loginUser({
      email: user.email,
      password: user.password,
    });
    const tokenLogin = await statusLogin.json();
    token = tokenLogin.token;
    /**
     * ? delete user
     */
    const statusDelete = await userFun.deleteUser(user, token);
    /**
     * ? check status
     */
    expect(statusDelete.status).toBe(201);
  });
});
