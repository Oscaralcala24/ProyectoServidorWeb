var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var pedido = require('../models/Pedido');
var usuario = require('../models/Usuario');
const Pedido = require('../models/Pedido');
var db = mongoose.connection;


/*GET - Muestra todos los pedidos de un usuario*/
router.get('/:idUser', function(req, res, next) {
  Pedido.find({},[{$lookup:{from:"usuario",localField:"id_usuario",foreignField:"id_",as:"usuarioPedidoID"}}],function (err,pedidoInfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200).json(pedidoInfo);
  }) 
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
  Pedido.find(req.params.id, function (err, pedidoinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200).json(pedidoinfo);
  });
});

/*DELETE - Borrar un pedido*/
router.delete('/:id', function (req, res, next) {
  Pedido.findByIdAndDelete(req.body.id, function (err, pedidoinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/*PUT - Actualizar un usuario existente identificado por su Id*/
router.put('/:id', function (req, res, next) {
  Pedido.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});


module.exports = router;