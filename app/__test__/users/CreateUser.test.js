const dotenv = require("dotenv").config();

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userFun = require("../fetchers/user");
const taskfun = require("../fetchers/task");
const projFun = require("../fetchers/project");

const User = mongoose.model("User");

// const fetch = require("node-fetch");

describe("TODO", () => {
  let database;
  let token;

  const user = {
    name: "todoman4",
    username: "todoman4",
    email: "todoman4@gmail.com",
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
    await database.close();
  });

  it("create user and check token", async () => {
    // ? create user
    const statusCreateUser = await userFun.createUser(user);
    // ? get user from db
    const userCreated = await User.findOne({
      username: user.username,
    });
    // ? check status code
    expect(statusCreateUser.status).toBe(201);
    // ? check db and send data
    expect(userCreated).toMatchObject({
      name: user.name,
      surname: user.surname,
      email: user.email,
    });
    // ? login user 
    const login = await userFun.loginUser({
      email: user.email,
      password: user.password,
    });
    const tokenl = await login.json();
    token = tokenl.token;
    // ? check valid jwt token
    const data = jwt.verify(token.toString(), process.env.JWT_KEY);
    const userToCheckToken = await User.findOne({ _id: data._id.toString() });
    expect(userCreated).toMatchObject({
      _id: userToCheckToken._id,
      name: userToCheckToken.name,
      surname: userToCheckToken.surname,
      email: userToCheckToken.email,
    });
  });
});
