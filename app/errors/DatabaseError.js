module.exports = class DatabaseError extends Error {
  constructor(...args) {
    super(args);
    this.status = 422;
    this.title = "Database Error";
  }
};
