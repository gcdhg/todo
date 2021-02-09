const fetch = require("node-fetch");

module.exports = {
  async createUser(user) {
    return await fetch("http://localhost:3000/users/create", {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Origin: "http://localhost:3000/users/create",
      },
      method: "POST",
      body: JSON.stringify(user),
    });
  },

  async loginUser(user) {
    return await fetch("http://localhost:3000/users/login", {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Origin: "http://localhost:3000/users/login",
      },
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
  },

  async getUser(userId, token) {
    return await fetch(`http://localhost:3000/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: `http://localhost:3000/users/${userId}`,
      },
    });
  },

  async deleteUser(user, token) {
    return fetch("http://localhost:3000/users/delete", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: "http://localhost:3000/users/delete",
      },
      method: "DELETE",
      body: JSON.stringify(user),
    });
  },

  async findUserByUsername(username, token) {
    return await fetch("http://localhost:3000/users/find", {
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: "http://localhost:3000/users/find",
      },
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
    });
  },

  async logoutUserOnce(token, bodyToken = undefined) {
    return await fetch("http://localhost:3000/users/logout", {
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: "http://localhost:3000/users/logout",
      },
      method: "PATCH",
      body: JSON.stringify({
        token: bodyToken === undefined ? undefined : bodyToken.token,
      }),
    });
  },

  async logoutUserOnAllDevices(token) {
    return await fetch("http://localhost:3000/users/logout/all", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: "http://localhost:3000/users/logout/all",
      },
      method: "PUT",
      body: JSON.stringify(),
    });
  },
};
