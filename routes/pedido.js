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

/*GET - Muestra los pedidos ordenados por una fecha determinada [ASC]*/
router.get('/ordenarFechaASC',function (req, res) {
  let fecha = req.body.fecha;
  
  if (fecha !== undefined && fecha !== null){
    Pedido.find().where('fecha').gte(fecha).exec(function (err, estadoPedido) {
      if (err) res.status(500).send(err);
      else res.status(200).json(estadoPedido);
    })
  }else{
    Pedido.find().exec(function (err, estadoPedido) { //Si no lo encuentra nos mostrará un array vacio, y si la query está vacia todos los pedidos.
      if (err) res.status(500).send(err);
      else res.status(200).json(estadoPedido);
    });
  }
});

/*GET - Muestra los pedidos ordenados por una fecha determinada [DESC]*/
router.get('/ordenarFechaASC',function (req, res) {
  let fecha = req.body.fecha;
  
  if (fecha !== undefined && fecha !== null){
    Pedido.find().where('fecha').lte(fecha).exec(function (err, estadoPedido) {
      if (err) res.status(500).send(err);
      else res.status(200).json(estadoPedido);
    })
  }else{
    Pedido.find().exec(function (err, estadoPedido) { //Si no lo encuentra nos mostrará un array vacio, y si la query está vacia todos los pedidos.
      if (err) res.status(500).send(err);
      else res.status(200).json(estadoPedido);
    });
  }
});

/*GET - Muestra los estados de los pedidos, pasando por url el estado que quiere visualizar*/
router.get('/',function (req,res,next) {
  let queryPedido = req.query.estado; //Creamos la query, con el estado que hemos pasado por parametro
  if(queryPedido !== undefined){ //Si la query no está vacia nos entrará dentro del if
    Pedido.find({ estado: queryPedido }).exec(function (error, estadoInfo) { //Buscara los estados, que le hemos pasado por la query y si el estado es 200 nos creara un json con la respuesta.
      if (error) res.status(500).send(error);
      else res.status(200).json(estadoInfo);
    });
  }else{
    Pedido.find().exec(function (error, estadoInfo) { //Si no lo encuentra nos mostrará un array vacio, y si la query está vacia todos los pedidos.
      if (error) res.status(500).send(error);
      else res.status(200).json(estadoInfo);
    });
  }
})

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