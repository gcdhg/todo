var express = require('express');
var router = express.Router();
var Todo = require('../models/tasks.js');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const todos = await Todo.find();

  res.render('index', {
    title: 'ToDo List',
    todos
  });
});

module.exports = router;
