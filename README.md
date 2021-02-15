# SIMPLE TODO APP - NodeJS, Express, MongoDB, Vue

## Run locally on your machine

You need to have installed Node and NPM.

Clone this repository

```bash
git clone https://github.com/gcdhg/todo.git
```

Install dependencies

```bash
npm install
```

Start NodeJS server at http://localhost:3000

```bash
npm start
```

For Nodemon usage

```bash
npm run dev
```

all default values must placed be in `.env` file:

```dosini
MONGODB_URL=mongodb://localhost:27017/myapp
SESSION_SECRET_KEY=session_secret
PORT=3000
JWT_KEY=jwt_secret
```

MONGODB_URL - url to connect mongobd database  
PORT - server port  
JWT_KEY - jwt secret key  
SESSION_SECRET_KEY - session secret key

### Technologies

NodeJS, Express, Nodemon, separate frotand app on vue in ./client

### Licence

The MIT License
