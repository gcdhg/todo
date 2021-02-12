const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
const userFun = require("../fetchers/user");

const User = mongoose.model("User");

// const fetch = require("node-fetch");

describe("TODO", () => {
  let database;
  let token;

  const user1 = {
    name: "userman1",
    surname: "smit",
    username: "userman1",
    email: "userman1@gmail.com",
    password: "userman1",
  };
  const user2 = {
    name: "userman21",
    surname: "smit",
    username: "userman2",
    email: "userman2@gmail.com",
    password: "userman2",
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
      email: user1.email,
    });
    await User.deleteOne({
      email: user2.email,
    });
    await database.close();
  });

  it("create user and get his data", async () => {
    // ? create user
    await Promise.all([userFun.createUser(user1), userFun.createUser(user2)]);
    // ? get user from db

    // ? login user
    token = await userFun.loginUser({
      email: user1.email,
      password: user1.password,
    });
    token = await token.json();
    // ? find user by username
    let foundUser = await userFun.findUserByUsername(user2.username, token);
    expect(foundUser.status).toBe(200);
    foundUser = await foundUser.json();
    expect(foundUser.username).toBe(user2.username);
  });
});
