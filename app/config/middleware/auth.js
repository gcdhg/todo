const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");
// const User = mongoose.model("User");
const User = require("@Models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    // console.log(token);
    const data = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: data._id, "tokens.token": token });
    if (!user) {
      return res.status(400).json({ error: "No user found" });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    // console.log(err);
    err.status = 401;
    next(err);
    // return res
    //   .status(401)
    //   .json({ error: "Not authorized to access this resource" });
  }
};
module.exports = auth;
