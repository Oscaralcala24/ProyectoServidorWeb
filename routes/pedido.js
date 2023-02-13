var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Pedido = require('../models/Pedido');
const Usuario = require('../models/Usuario');
var db = mongoose.connection;


/*GET - Muestra todos los pedidos de un usuario*/
router.get('/usuario/:id', function(req, res, next) {
  Pedido.find({ 'usuario': req.params.id }).exec(function(err, posts) {
      if (err) res.status(500).send(err);
      else res.status(200).json(posts);
  });
});

/*POST - Crear nuevo pedido*/
router.post('/', function (req, res, next) {
  Pedido.create(req.body, function (err, pedidoinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/*GET - Mostrar datos de un pedido*/
router.get('/:id', function (req, res, next) {
  Pedido.findById(req.params.id, function (err, pedidoinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(pedidoinfo);
  });
});


/*DELETE - Borrar un pedido*/
router.delete('/:id', function (req, res, next) {
  Pedido.findByIdAndDelete(req.params.id, function (err, pedidoinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});



module.exports = router;