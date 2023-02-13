var express = require('express');
var router = express.Router();
var usuario = require('../models/Usuario')
var mongoose = require('mongoose');
var db = mongoose.connection;


// GET - Listado de usuarios ordenados por fecha de creación
router.get('/', function (req, res, next) {
  usuario.find().sort('-creationdate').exec(function (error, usuarioInfo) {
    if (error) res.status(500).send(error);
    else res.status(200).json(usuarioInfo);
  });
});

// GET - Listar un único usuario por su Id
router.get('/:id', function (req, res, next) {
  usuario.findById(req.params.id, function (error, usuarioInfo) {
    if (error) res.status(500).send(error);
    else res.status(200).json(usuarioInfo);
  });
});

// GET - Listar un único usuario por su nombre
router.get('/finduser', function (req, res, next) {
  usuario.findOne({ nombre: req.body.nombre }, function (error, usuarioInfo) {
    if (error) res.status(500).send(error);
    else res.status(200).json(usuarioInfo);
  });
});

// POST - Crear un nuevo usuario
router.post('/', function (req, res, next) {
  usuario.create(req.body, function (error, usuarioInfo) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

// POST - Comprueba si el usuario existe
router.post('/signin', function (req, res, next) {
  usuario.findOne({ nombre: req.body.nombre }, function (error, usuarioInfo) {
    if (error) res.status(500).send('Error del servidor en el usuario');
    // Usuario
    if (usuarioInfo != null) {
      usuarioInfo.comparePassword(req.body.contrasenia, function (error,
        isMatch) {
        if (error) return next(error);
        // Contrasenia
        if (isMatch)
          res.status(200).send({
            message: 'ok', role:
            usuarioInfo.role, id: usuarioInfo._id
          });
        else
          res.status(200).send({
            message: 'la contraseña no coincide'
          });
      });
    } else res.status(401).send({
      message: 'usuario no registrado'
    });
  });
});

// PUT - Actualizar un usuario existente identificado por su Id
router.put('/:id', function (req, res, next) {
  usuario.findByIdAndUpdate(req.params.id, req.body, function (error) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

// DELETE - Eliminar un usuario existente identificado por su Id
router.delete('/:id', function (req, res, next) {
  usuario.findByIdAndDelete(req.params.id, function (error, usuarioInfo) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

module.exports = router;