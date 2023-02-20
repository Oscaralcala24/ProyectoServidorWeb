var express = require('express');
var router = express.Router();
var usuario = require('../models/Usuario')
var producto = require('../models/Producto')
var mongoose = require('mongoose');
var db = mongoose.connection;


// GET - Listado de usuarios ordenados por fecha de creación
router.get('/', function (req, res, next) {
  let queryUsuario = req.query.role;
  console.log(queryUsuario);
  if (queryUsuario != null) {
    usuario.find({ role: queryUsuario }).exec(function (error, usuarioInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(usuarioInfo);
    });
  } else {
    usuario.find().exec(function (error, usuarioInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(usuarioInfo);
    });
  }

});

// GET - Listar un único usuario por su Id
router.get('/:id', function (req, res, next) {
  usuario.findById(req.params.id, function (error, usuarioInfo) {
    if (error) res.status(500).send(error);
    else res.status(200).json(usuarioInfo);
  });
});

// POST - Listar un único usuario por su nombre
router.post('/findusuario', function (req, res, next) {
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

// Añadir producto favorito al usuario
router.put('/favoritos/:id', function (req, res, next) {
  console.log(req.params.id )
  console.log(req.body.id )
  usuario.findByIdAndUpdate({ "_id": req.params.id }, { $addToSet: { "favorito": req.body.id } }).exec(function (err, producto) {
    if (err) res.status(500).send(err);
    else res.status(200).json(producto);
  });
});


// Mostrar productos favoritos del usuario
router.get('/favoritos/:id', function (req, res, next) {
  usuario.find({ '_id': req.params.id }, { "favorito": 1 }).populate('favorito').exec(function (err, producto) {
    if (err) res.status(500).send(err);
    else res.status(200).json(producto);
  });
});



module.exports = router;