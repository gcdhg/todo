const jwt = require("jsonwebtoken");
const User = require("@Models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const data = await jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: data._id, "tokens.token": token });
    if (!user) {
      return res.status(400).json({ error: "No user found" });
    }
    req.user = user._id;
    req.token = token;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Not authorized to access this resource" });
  }
};
module.exports = auth;
