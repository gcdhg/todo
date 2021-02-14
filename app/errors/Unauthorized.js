module.exports = class Unauthorized extends Error {
  constructor(...args) {
    super(args);
    this.status = 401;
    this.title = "Unauthorized";
  }
};
