# CATEGORIA
{
    "nombre_categoria":"Sudaderas"
}   
{
    "nombre_categoria":"Camiseta"
}
{
    "nombre_categoria":"Tazas"
}
{
    "nombre_categoria":"Calcetines"
}

# PRODUCTO

{
    sku: 001,
    nombre: Github T-shirt,
    stock: 20,
    talla_ropa: M,
    precio: 10.95,
    imagen: public\stylesheets\assets\img\productos\camiseta.png,
    id_categoria: [{
        type: Schema.ObjectId,
        ref: 'Categoria'
    }]
}
{
    sku: 002,
    nombre: Minecraft socks,
    stock: 5,
    talla_zapato: 42,
    precio: 5.74,
    imagen: public\stylesheets\assets\img\productos\calcetines.png,
    id_categoria: [{
        type: Schema.ObjectId,
        ref: 'Categoria'
    }]
}
{
    sku: 003,
    nombre: Discord cup,
    stock: 5,
    precio: 6.89,
    imagen: public\stylesheets\assets\img\productos\taza.png,
    id_categoria: [{
        type: Schema.ObjectId,
        ref: 'Categoria'
    }]
}
{
    sku: 003,
    nombre: VS Code hoodie,
    stock: 15,
    precio: 39.95,
    imagen: public\stylesheets\assets\img\productos\sudadera.png,
    id_categoria: [{
        type: Schema.ObjectId,
        ref: 'Categoria'
    }]
}

# Usuario
{
    dni: 12345678Z,
    nombre: Armando ,
    apellidos: Jaleo Lopez,
    email: armandojaleo@gmail.com,
    telefono: 123456987,
    contrasenia: asd123,
    direccion: C\bormujos Nº21K,
    role: user,
    //Referencia Producto favorito
    favorito: [{
        type: Schema.ObjectId,
        ref: 'Producto',
        default: null
    }]
}
{
    dni: 87654321Z,
    nombre: Aitor ,
    apellidos: Tilla Lopez,
    email: aitortilla@gmail.com,
    telefono: 23458978,
    contrasenia: sdfg1234,
    direccion: C\camas Nº58H,
    role: admin,
    //Referencia Producto favorito
    favorito: [{
        type: Schema.ObjectId,
        ref: 'Producto',
        default: null
    }]
}
# Pedido
{
    estado:En preparacion,
    contenido:[
        {
        cantidad: 5,
        producto: 
    }], 
    usuario:[{
        type: Schema.ObjectId,
        ref: 'Usuario'
    }]
}
{
    estado:En camino,
    contenido:[
        {
        cantidad: 2,
        producto: 
    }], 
    usuario:[{
        type: Schema.ObjectId,
        ref: 'Usuario'
    }]
}