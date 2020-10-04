const { model } = require("mongoose");

const dotenv = require('dotenv').config();

const mongoose = require('mongoose');


const Project = require('../../models/projects');
const Task = require('../../models/tasks');
const User = mongoose.model('User');


const fetch = require('node-fetch');

module.exports = {
    async createTask (task, token) {
        return await fetch("http://localhost:3000/create", {
            body: JSON.stringify(task),
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                "Origin": "http://localhost:3000/create",
            },
        })
    }
    
}