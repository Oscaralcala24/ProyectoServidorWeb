var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Producto = require('../models/Producto.js');
var Usuario = require('../models/Usuario.js');
var db = mongoose.connection;


var pedidoSchema = new Schema({
    fecha:{type: Date , default: Date.now()},
    estado:{type:String, enum:["En preparacion","Preparado","En camino","Entregado"]},
    contenido:[
        {
        cantidad:{type: Number , required: true},
        producto:{type: Schema.ObjectId,ref: 'Producto'}
    }], 
    usuario:[{
        type: Schema.ObjectId,
        ref: 'Usuario'
    }]
})

module.exports = mongoose.model('Pedido', pedidoSchema);