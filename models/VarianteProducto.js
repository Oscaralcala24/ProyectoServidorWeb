var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Producto = require('./Producto.js');
var db = mongoose.connection;

var varianteProductoSchema = new Schema({
    sku: { type: String, required: true },
    talla: { type: String },
    cantidad: { type: Number, required: true },
    //Referencia a Producto
    producto: [{
        type: Schema.ObjectId,
        ref: 'Producto',
        default: null
    }]
})

module.exports = mongoose.model('VarianteProducto', varianteProductoSchema);