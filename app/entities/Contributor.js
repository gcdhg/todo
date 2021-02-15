const PlainUser = require("./User");

class Contributor extends PlainUser {
  async createTask() {
    throw new Error({ status: 403 });
  }
  async deleteTask() {
    throw new Error({ status: 403 });
  }
  async editTask() {
    throw new Error({ status: 403 });
  }
}

module.exports = Contributor;
