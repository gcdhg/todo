const dotenv = require('dotenv').config();

const mongoose = require('mongoose');
const userfunctions = require('./helpers/user');
const taskfunctions = require('./helpers/task')

const Project = require('../models/projects');
const Task = require('../models/tasks');
const User = mongoose.model('User');


const fetch = require('node-fetch');


describe('create new User', () => {
    let database;
    let token;


    let user = {
        name: 'marvin',
        username: 'marvin',
        email: 'marvin@gmail.com',
        password: '12345'
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

    it('create and login user', async () => {

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
        
        //delete user
        const statusDelete = await userfunctions.deleteUser(user, token)

        expect(statusDelete.status).toBe(201);

    })
});
