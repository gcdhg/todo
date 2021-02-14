module.exports = class NotFoundError extends Error {
    constructor(...args) {
      super(args);
      this.status = 404;
      this.title = "Resorse not found Error";
    }
  };
  