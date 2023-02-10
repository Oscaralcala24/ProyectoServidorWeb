var express = require('express');
var router = express.Router();
var usuario = require('../models/Usuario')
var mongoose = require('mongoose');
var db = mongoose.connection;


// GET - Listado de usuarios ordenados por fecha de creación
router.get('/', function (req, res, next) {
  User.find().sort('-creationdate').exec(function (err, users) {
    if (err) res.status(500).send(err);
    else res.status(200).json(users);
  });
});

// GET - Listar un único usuario por su Id
router.get('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, userinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(userinfo);
  });
});

// GET - Listar un único usuario por su nombre
router.get('/finduser', function (req, res, next) {
  User.findOne({ nombre: req.body.nombre }, function (err, user) {
    if (err) res.status(500).send(err);
    else res.status(200).json(user);
  });
});

// POST - Crear un nuevo usuario
router.post('/', function (req, res, next) {
  User.create(req.body, function (err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// POST - Comprueba si el usuario existe
router.post('/signin', function (req, res, next) {
  User.findOne({ nombre: req.body.nombre }, function (err, user) {
    if (err) res.status(500).send('Error del servidor en el usuario');
    // Usuario
    if (user != null) {
      user.comparePassword(req.body.contrasenia, function (err,
        isMatch) {
        if (err) return next(err);
        // Contrasenia
        if (isMatch)
          res.status(200).send({
            message: 'ok', role:
              user.role, id: user._id
          });
        else
          res.status(200).send({
            message: 'la contrasenia no coincide'
          });
      });
    } else res.status(401).send({
      message: 'usuario no registrado'
    });
  });
});

// PUT - Actualizar un usuario existente identificado por su Id
router.put('/:id', function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// DELETE - Eliminar un usuario existente identificado por su Id
router.delete('/:id', function (req, res, next) {
  User.findByIdAndDelete(req.params.id, function (err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;