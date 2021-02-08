require("module-alias/register");
const mongoose = require("mongoose");

const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Task = require("./tasks.js");
const Project = require("./projects.js");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, trim: true },
  surname: { type: String, trim: true },
  email: { type: String, unique: true },
  username: { type: String, unique: true, trim: true },
  password: { type: String },
  tokens: [{ token: { type: String, required: true } }],
  tasks: [{ type: Schema.ObjectId, ref: "Task" }],
  owned: [{ type: Schema.ObjectId, ref: "Project" }],
  projects: [{ type: Schema.ObjectId, ref: "Project" }],
});

/**
 * Validations
 */

// pre required validators
UserSchema.path("email").required(true, "Email cannot be blank");
UserSchema.path("password").required(true, "Password cannot be blank");
UserSchema.path("username").required(true, "Username cannot be blank");

//path validdators
UserSchema.path("email").validate(async function (email) {
  return (await validator.isEmail(email)) && !validator.isEmpty(email);
}, "Wrong email");

UserSchema.path("username").validate(
  async (username) =>
    validator.isAlphanumeric(username) && !validator.isEmpty(username),
  "Wrong username"
);

UserSchema.path("name").validate(async function (name) {
  return await validator.isAlphanumeric(name);
}, "Wrong name");

UserSchema.path("surname").validate(async function (surname) {
  return await validator.isAlphanumeric(surname);
}, "Wrong surname");

/**
 * Pre-save hook
 */
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.statics.findByRecords = async function (email, password) {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (!user) {
    throw Error("Invalid login Records");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw Error("Invalid login Records");
  }
  return user;
};

UserSchema.statics.findByRecordsAndDelete = async function (email, password) {
  const user = await User.findByRecords(email, password);
  await User.deleteOne({ email: user.email });
  return true;
};

UserSchema.statics.destroyToken = async function (id, token) {
  const user = await User.findOne({ _id: id, "tokens.token": token });
  if (!user) {
    throw "no such token";
  }
  const newTokens = user.tokens;
  await user.tokens.splice(user.tokens.indexOf(token), 1);
  // await User.findOneAndUpdate({ email: user.email }, { tokens: newTokens });
  await user.save();
  return true;
};

UserSchema.statics.destroyAllTokens = async function (id, token) {
  const user = await User.findOne({ _id: id, "tokens.token": token });
  user.tokens = [];
  await user.save();
  return true;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
