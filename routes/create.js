var express = require('express');
var router = express.Router();
var Todo = require('../models/tasks.js');

/* GET create page */
router.get('/', (req, res) => {
    res.render('create', {
      title: 'Create todo',
      isCreate: true
    });
  });
  
router.post('/', async (req, res) => {
    var todo = new Todo({
      title: req.body.title,
      des: req.body.des
    });
    
    await todo.save(); 
    res.redirect('/');
});

module.exports = router;