const fetch = require("node-fetch");

module.exports = {
  async getOneprojectById(token, id) {
    return await fetch(`http://localhost:3000/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: `http://localhost:3000/projects/${id}`,
      },
    });
  },

  async editOneprojectById(token, project) {
    return await fetch(`http://localhost:3000/projects//edit`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: `http://localhost:3000/projects/edit`,
      },
      body: JSON.stringify({ projectId: project._id, title: project.title }),
    });
  },

  async createProject(token, project) {
    return await fetch("http://localhost:3000/projects/create", {
      body: JSON.stringify(project),
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: "http://localhost:3000/projects/create",
      },
    });
  },

  async deleteProject(token, id) {
    return await fetch("http://localhost:3000/projects/delete", {
      body: JSON.stringify({ projectId: id }),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: "http://localhost:3000/projects/delete",
      },
    });
  },

  async getUserProjects(token) {
    return await fetch("http://localhost:3000/projects/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: "http://localhost:3000/projects/all",
      },
    });
  },

  async addUserToProject(token, newUser) {
    return await fetch("http://localhost:3000/projects/add", {
      body: JSON.stringify(newUser),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: "http://localhost:3000/projects/add",
      },
    });
  },
};
