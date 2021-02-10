const fetch = require("node-fetch");

export default {
  async createTask(token, newTask) {
    return await fetch("http://localhost:3000/tasks/create", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: "http://localhost:3000/tasks/create",
      },
      method: "POST",
      body: JSON.stringify({
        title: newTask.title,
        planedAt: newTask.planedAt,
        projectId: newTask.project,
        "state.currentState": newTask.state,
      }),
    });
  },
  //   await fetch("http://localhost:3000/tasks/create", {
  //         headers: {
  //           Authorization: `Bearer ${context.getters.RETURN_TOKEN}`,
  //           "Content-Type": "application/json;charset=utf-8",
  //           Origin: "http://localhost:3000/tasks/create",
  //         },
  //         method: "POST",
  //         body: JSON.stringify({
  //           title: newTask.title,
  //           planedAt: newTask.planedAt,
  //           projectId: newTask.project,
  //           "state.currentState": newTask.state,
  //         }),
  //       })

  async getAllPrivateTasks(token) {
    return await fetch("http://localhost:3000/tasks/get", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: "http://localhost:3000/tasks/get",
      },
    });
  },

  async getTaskById(token, id) {
    return await fetch(`http://localhost:3000/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: `http://localhost:3000/tasks/${id}`,
      },
    });
  },

  async editTask(token, id, newTask) {
    return await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: `http://localhost:3000/tasks/${id}`,
      },
      body: JSON.stringify(newTask),
    });
  },

  async deleteTask(token, id) {
    return await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: `http://localhost:3000/tasks/${id}`,
      },
    });
  },

  async changeStateTask(token, id, newStatus) {
    return await fetch(`http://localhost:3000/state/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        Origin: `http://localhost:3000/state/${id}`,
      },
      body: JSON.stringify(newStatus),
    });
  },
};
