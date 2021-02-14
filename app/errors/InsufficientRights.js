module.exports = class InsufficientRights extends Error {
  constructor(...args) {
    super(args);
    this.status = 403;
    this.title = "InsufficientRights";
  }
};
