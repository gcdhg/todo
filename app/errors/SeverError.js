module.exports = class ServerError extends Error {
  constructor(...args) {
    super(args);
    this.status = 500;
    this.title = "Internal server Error";
  }
};
