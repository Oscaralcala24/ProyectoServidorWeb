var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var productoEsquema = new Schema({
nombre: { type: String, required: true },
tipo: { type: String, required: true },
precio: { type: Number, required: true },
imagen: { type: String, required: true },
});

module.exports = mongoose.model("Producto",productoEsquema);