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

router.post('/', async (req, res) => {
  const todo = await Todo.findById(req.body.id);

  if (todo.completed){
    todo.completed = false
  } else todo.completed = true;
  if (todo.completed) {
    todo.timeOfComplition = Date.now();
  }
  await todo.save();
  res.redirect(303, '/');
});

module.exports = router;
