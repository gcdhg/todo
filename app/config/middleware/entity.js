// entitities
const Plain = require("@Entitty/User");
const Owner = require("@Entitty/Owner");
const Contributor = require("@Entitty/Contributor");

// database
const Project = require("@Models/projects");
// lodash
const _ = require("lodash");

const entity = async (req, _res, next) => {
  try {
    if (_.has(req.body, "projectId")) {
      const project = await Project.findOne({ _id: req.body.projectId });
      if (project.owner.toString() === req.user) {
        req.currentUser = new Owner();
        next();
      }
      if (
        project.contributors.some((user) => user.user.toString() === req.user)
      ) {
        req.currentUser = new Contributor();
        next();
      }
    }
    req.currentUser = new Plain();
    next();
  } catch (err) {
    err.status = 403
    next(err);
  }
};

module.exports = entity;
