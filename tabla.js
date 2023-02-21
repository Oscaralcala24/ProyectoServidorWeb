function crearTabla(array) {
    const tabla = document.getElementById('tabla');

    const filaEncabezado = document.createElement('tr');
    const rotulos = ['CCAA', 'D entregadas', 'D administradas', 'D Pausas completas', '% Entregas', '% Pob Adm', '% Pob Com'];
    tabla.appendChild(filaEncabezado);
    rotulos.forEach((rotulo) => {
        const dato = document.createElement('th');
        dato.innerHTML = rotulo;
        filaEncabezado.appendChild(dato);
    })

    array.forEach((comunidad) => {
        const filaDato = document.createElement('tr');
        tabla.appendChild(filaDato);
        for (const key in comunidad) {
            const info = comunidad[key];
            const dato = document.createElement('td');
            filaDato.appendChild(dato);
            dato.innerHTML = info;
        }
    })
}
