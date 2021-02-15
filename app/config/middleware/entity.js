// entitities
const Plain = require("@Entitty/User");
const Contributor = require("@Entitty/Contributor");
const Owner = require("@Entitty/Owner");

// database
const Project = require("@Models/projects");
// lodash
const _ = require("lodash");

const entity = async (req, _res, next) => {
  try {
    const user = req.user;
    if (_.has(req.body, "projectId")) {
      const project = await Project.findOne({ _id: req.body.projectId });
      if (project.owner.toString() === user._id.toString()) {
        req.currentUser = new Owner(user);
        return next();
      }
      const isContrib = project.contributors.some(
        (user) => user.user.toString() === req.user._id
      );
      if (isContrib) {
        req.currentUser = new Contributor(user);
        return next();
      }
    }
    req.currentUser = new Plain(user);
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};

module.exports = entity;
