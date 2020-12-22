const dotenv = require('dotenv').config();

const mongoose = require('mongoose');
const userfunctions = require('./fetchers/user');
const taskfunctions = require('./fetchers/task')

const Project = require('../models/projects');
const Task = require('../models/tasks');
const User = mongoose.model('User');


const fetch = require('node-fetch');
const { findById } = require('../models/tasks');


describe('create new User', () => {
    let database;

    let user = {
        name: 'kfejg',
        username: 'keofke',
        email: 'kepfjpj@gmail.com',
        password: 'kpew[gk'
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

    it('logout user once and logout all', async () => {
        let token;
        let tokenNew;
        // Create user
        await userfunctions.createUser(user);

        statusOldLogin = await userfunctions.loginUser({
            email: user.email,
            password: user.password
        });
        token = statusOldLogin.json();


        //login user and get token
        for (let i = 0; i < 3; i++) {
            statusLogin = await userfunctions.loginUser({
                email: user.email,
                password: user.password
            });

            // expect(statusLogin.status).toBe(200);
        }
        //save token
        tokenNew = await statusLogin.json();

        //destroy old token send in a body part of the request
        const statusDestroyOneBodyToken = await userfunctions.logoutUserOnce(tokenNew, token)

        //check status
        expect(statusDestroyOneBodyToken.status).toBe(201);

        //check that token destroied
        let userNew = await User.find({
            email: user.email
        })

        //check that token send in json body destroied
        expect(userNew[0].tokens.filter(t => t.tokens === token)).toEqual([]);


        //destroy token send in auth bear
        await userfunctions.logoutUserOnce(tokenNew)

        userNew = await User.find({
            email: user.email
        })

        //check that token send in auth bear destroied
        expect(userNew[0].tokens.filter(t => t.token === tokenNew)).toEqual([]);

        //destroy all tokens
        const statusOldLogin2 = await userfunctions.loginUser({
            email: user.email,
            password: user.password
        });
        token = await statusOldLogin2.json();
        await userfunctions.logoutUserOnAllDevices(token)

        const userNew2 = await User.find({
            email: user.email
        })
        //check that token send in auth bear destroied
        expect(userNew2[0].tokens).toBe([]);
    })
});