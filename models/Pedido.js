var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Producto = require('../models/Producto.js');
var Usuario = require('../models/Usuario.js');

var pedidoSchema = new Schema({
    id_pedidos:{type:Schema.ObjectId},
    fecha:{type: Date , required: true},
    cantidad:{type: Number , required: true},
    sku_productos:[{
        type:Schema.ObjectId,
        ref: 'Producto'
    }],
    id_usuario:[{
        type: Schema.ObjectId,
        ref: 'Usuario'
    }]
})

module.exports = mongoose.model('Pedido', pedidoSchema);