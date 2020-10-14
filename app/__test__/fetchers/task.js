const dotenv = require('dotenv').config();

const fetch = require('node-fetch');

module.exports = {
    async createTask(token, task) {
        return await fetch("http://localhost:3000/create", {
            body: JSON.stringify(task),
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                "Origin": "http://localhost:3000/create",
            },
        })
    },

    async getAllPrivateTasks(token) {
        return await fetch("http://localhost:3000/get", {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                "Origin": "http://localhost:3000/get",
            },
        })
    },

    async getTaskById(token, id) {
        return await fetch(`http://localhost:3000/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                "Origin": `http://localhost:3000/${id}`,
            }
        })
    },

    async editTask(token, id, newTask) {
        return await fetch(`http://localhost:3000/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                "Origin": `http://localhost:3000/${id}`,
            },
            body: JSON.stringify(newTask)
        })
    },

    async deleteTask(token, id) {
        return await fetch(`http://localhost:3000/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                "Origin": `http://localhost:3000/${id}`,
            },
        })
    },

    async changeStateTask(token, id, newStatus) {
        return await fetch(`http://localhost:3000/state/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                "Origin": `http://localhost:3000/state/${id}`,
            },
            body: JSON.stringify(newStatus)
        })
    }
}