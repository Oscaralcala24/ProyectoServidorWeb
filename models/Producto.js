var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var productoEsquema = new Schema({
    sku: { type: String, required: true },
    nombre: { type: String, required: true },
    stock: { type: Number, required: true },
    talla_ropa: { type: String, required: false },
    talla_zapato: { type: Number, required: false },
    precio: { type: Number, required: true },
    imagen: { type: String, required: true },
    id_categoria: [{
        type: Schema.ObjectId,
        ref: 'Categoria'
    }]
});

module.exports = mongoose.model("Producto", productoEsquema);