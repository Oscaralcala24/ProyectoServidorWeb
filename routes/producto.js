var express = require('express');
var router = express.Router();
var categoria = require('../models/Categoria')
var Producto = require('../models/Producto')
var usuario = require('../models/Usuario');
var mongoose = require('mongoose');
var db = mongoose.connection;

/* Inserta un producto */
router.post('/', function(req, res, next) {
  Producto.create(req.body, function (err, producto) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});
/* Mostrar todos los productos */
router.get('/', function (req, res, next) {
  Producto.find(function (err, producto) {
    if (err) res.status(500).send(err);
    else res.status(200).json(producto);
  });
});
/* Mostrar un producto con una id */
router.get('/:id', function (req, res, next) {
  Producto.findById(req.params.id,function (err, producto) {
    if (err) res.status(500).send(err);
    else res.status(200).json(producto);
  });
});


/* Mostrar todos los productos de una categoría */
router.get('/categoria/:id_categoria', function (req, res, next) {
  Pedido.aggregate({},[{$lookup:{from:"categorias",localField:"id_categoria",foreignField:"id_categoria",as:"categoria_id"}}],function (err,producto) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200).json(producto);
  })
});


/* Borrar un producto */
router.delete('/:id', function (req, res, next) {
  Producto.findByIdAndDelete(req.params.id, function (err, producto) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/* Modificar stock producto */
router.put('/:id', function (req, res, next) {
  Producto.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/* Muestra los productos favoritos del usuario */
router.get('/favoritos/:id', function (req, res, next) {
  Producto.find({'usuario': req.params.id },{}).populate('usuario').exec(function (err, producto){
    if (err) res.status(500).send(err);
    else res.status(200).json(producto);
  });
});







module.exports = router;