const dotenv = require("dotenv").config();

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userFun = require("./fetchers/user");
const taskfun = require("./fetchers/task");

const User = mongoose.model("User");

// const fetch = require("node-fetch");

describe("TODO", () => {
  let database;
  let token;

  const user = {
    name: "todoman5",
    username: "todoman5",
    email: "todoman43@gmail.com",
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
    await userFun.createUser(user);
    // ? get user from db

    // ? login user
    const login = await userFun.loginUser({
      email: user.email,
      password: user.password,
    });

    // ? get user from db
    const userCreated = await User.findOne({
      username: user.username,
    });
    const id = userCreated._id;
    // ? get token from login
    token = await login.json();
    // ? get user data
    const getUserData = await userFun.getUser(token.username, token);
    // ? check status code
    expect(getUserData.status).toBe(200);
  });
});
