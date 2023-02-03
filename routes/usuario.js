var express = require('express');
var router = express.Router();
var usuario = require('../models/Usuario')
var mongoose = require('mongoose');
var db = mongoose.connection;

/* GET users listing. */
router.get('/usuario', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;