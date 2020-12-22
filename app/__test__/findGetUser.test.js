const dotenv = require('dotenv').config();

const mongoose = require('mongoose');
const userfunctions = require('./fetchers/user');
const taskfunctions = require('./fetchers/task')

const Project = require('../models/projects');
const Task = require('../models/tasks');
const User = mongoose.model('User');


const fetch = require('node-fetch');


describe('create new User', () => {
    let database;

    let user = {
        name: 'emong',
        username: 'emong',
        email: 'emong@gmail.com',
        password: 'emong'
    }

    let task = {
        title: 'new task',
        planedAt: new Date(2020, 12, 12)
    }


    beforeAll(async () => {
        database = mongoose.connection;

        await mongoose.connect(String(process.env.MONGODB_URL), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        await database.on('error', error => console.log(`Connection to database failed: ${error}`));
        await database.on('connected', () => console.log('Connected to database'));

    });

    afterAll(async () => {
        await User.deleteOne({
            email: user.email
        })
        await database.close()
    });


    it('create user, add task, get user by username, get ur data of forein user', async () => {
        let token;
        // Create user
        const statusCreateUser = await userfunctions.createUser(user);

        //check status code
        expect(statusCreateUser.status).toBe(201);

        //check database
        const userCreated = await User.findOne({
            username: user.username
        });

        expect(userCreated).toMatchObject({
            name: user.name,
            surname: user.surname,
            email: user.email
        });
        //login user and get token
        const statusLogin = await userfunctions.loginUser({
            email: user.email,
            password: user.password
        });

        expect(statusLogin.status).toBe(200);
        //save token
        token = await statusLogin.json()[0];
        // //find user by user name
        const statusFindUserByUsername = await userfunctions.findUserByUsername(user.username, token);

        // //check status
        expect(statusFindUserByUsername.status).toBe(200)
        // //get json from response
        const data = await statusFindUserByUsername.json();
        // //get forieng user data
        const statusGetForienUserData = await userfunctions.getUser(data.id, token)
        //check status code
        expect(statusGetForienUserData.status).toBe(200)

    })
});
