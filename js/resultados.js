
var precioTotal = 0;
var precioEntrada = 6.50;
var pelicula = '';
var hora = '';
var dia = '';
var numAsiento = [];

dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

function Compra(pelicula, dia, hora, precio, asientos) {
    this.pelicula = pelicula
    this.dia = dia
    this.hora = hora
    this.precio = precio
    this.asientos = asientos
}

$(document).ready(function () {
    var peli = JSON.parse(localStorage.getItem("entradaPeli"));
    pelicula = peli.pelicula;
    hora = peli.hora;
    dia = dias[peli.dia - 1];

    var asientos = JSON.parse(localStorage.getItem("asientos"));

    for (let i = 0; i < asientos.length; i++) {
        if (asientos[i].estado == 'select') {
            precioTotal += precioEntrada;
            numAsiento.push(asientos[i].id);
        }
    }

    $('#pelicula').html(pelicula)
    $('#dia').html(dia)
    $('#hora').html(hora)
    $('#precioTotal').html(precioTotal + '€')
    for (let i = 0; i < numAsiento.length; i++) {
        sitio = [];
        sitio = numAsiento[i].split('_')
        $('#lista').append('<li>Fila ' + (parseInt(sitio[0]) + 1) + ' asiento ' + (parseInt(sitio[1]) + 1) + '</li>')
    }

    $("form").submit(function (e) {
        e.preventDefault();
        var form = this;
        if (precioTotal > 0) {
            confirmar();
        }
    });

})


function irAtras() {
    window.location.href = 'index.html'
}


function confirmar() {
    var asientos = JSON.parse(localStorage.getItem("asientos"));
    for (let i = 0; i < asientos.length; i++) {
        if (asientos[i].estado == 'select') {
            asientos[i].estado = 'ocupado';
        }
    }
    var asientosJson = JSON.stringify(asientos);
    localStorage.setItem("asientos", asientosJson);

    /*
    compra = new Compra(pelicula, dia, hora, precioTotal, asientos);
    if (localStorage.getItem("compras") === null) {

        localStorage.setItem("compras", compra);
    }
    else {
        var compras = localStorage.getItem("compras");
        compras.push(compra);
        localStorage.setItem("compras", compra);
    }
*/
    fin();
}


function fin() {
    $('form').empty();
    $('h3').html('Confirmación');
    $('.container').append('<h1>¡Compra realizada!</h1>');
    $('.container').append('<a href="index.html">Volver a cartelera</a>')
}