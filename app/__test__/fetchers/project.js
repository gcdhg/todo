const dotenv = require('dotenv').config();

const mongoose = require('mongoose');


const Project = require('../../models/projects');
const Task = require('../../models/tasks');

const User = mongoose.model('User');


const fetch = require('node-fetch');

module.exports = {
    async getAllProjects(token) {
        return await fetch("http://localhost:3000/projects/get", {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                "Origin": "http://localhost:3000projects/get",
            },
        })
    },

    async getOneprojectById(token, id) {
        return await fetch(`http://localhost:3000/projects/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                "Origin": `http://localhost:3000/projects/${id}`,
            }
        })
    },

    async createProject(token, project) {
        return await fetch("http://localhost:3000/projects/create", {
            body: JSON.stringify(project),
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                "Origin": "http://localhost:3000/projects/create",
            },
        })
    },

    async deleteProject(token) {
        return await fetch("http://localhost:3000/projects/delete", {
            body: JSON.stringify(project),
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                "Origin": "http://localhost:3000/projects/delete",
            },
        })
    },

    async addUserToProject(token, newUser) {
        return await fetch("http://localhost:3000/projects/add", {
            body: JSON.stringify(newUser),
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                "Origin": "http://localhost:3000/projects/add",
            },
        })
    },
}