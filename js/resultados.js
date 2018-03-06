
var precioTotal = 0;
var precioEntrada = 6.50;
var pelicula = '';
var hora = '';
var dia = '';
var numAsiento = [];

dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

function Usuario(nombre, apellidos, email){
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.email = email;
}

function Tarjeta (numero, mes, anio, csc, tipo){
    this.numero = numero;
    this.mes = mes;
    this.anio = anio;
    this.csc = csc;
    this.tipo = tipo;
}

function Compra(usuario, tarjeta, pelicula, dia, hora, precio, asientos) {
    this.usuario = usuario;
    this.tarjeta = tarjeta;
    this.pelicula = pelicula
    this.dia = dia
    this.hora = hora
    this.precio = precio
    this.asientos = asientos
}

$(document).ready(function () {

    $('.spinner').fadeIn()
    var delayInMilliseconds = 3000;
    setTimeout(function() {
        $('.spinner').hide()
        var peli = JSON.parse(localStorage.getItem("entradaPeli"));
        pelicula = peli.pelicula;
        hora = peli.hora;
        dia = dias[peli.dia];
    
        var sala = JSON.parse(localStorage.getItem("sala"));
        var asientos = sala.asientos;
    
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
            else{
                alert('Debe seleccionar algún asiento.')
            }
        });
    
    
        $('.botonAtras').click(function(){
            window.location.href = 'entradas.html';
        });  
    }, delayInMilliseconds);
})


function irAtras() {
    window.location.href = 'index.html'
}


function confirmar() {
    var sala = JSON.parse(localStorage.getItem("sala"));
    var asientos = sala.asientos;
    for (let i = 0; i < asientos.length; i++) {
        if (sala.asientos[i].estado == 'select') {
            sala.asientos[i].estado = 'ocupado';
        }
    }
    var salaJson = JSON.stringify(sala);
    localStorage.setItem("sala", salaJson);

    
    var compras = []

    var usuario = new Usuario($('#nombre').val(), $('#apellidos').val(), $('#email').val());
    var tarjeta = new Tarjeta($('#numTarjeta').val(), $('#mes').val(), $('#anio').val(), $('#csc').val(), $('select[name=tipoTarjeta]').val());
    var compra = new Compra(usuario, tarjeta, pelicula, dia, hora, precioTotal, numAsiento);

    if (localStorage.getItem("compras") === null) {
        compras.push(compra);
        var comprasJson = JSON.stringify(compras);
        localStorage.setItem("compras", comprasJson);
    }
    else{
        compras = JSON.parse(localStorage.getItem("compras"))
        compras.push(compra);
        var comprasJson = JSON.stringify(compras);
        localStorage.setItem("compras", comprasJson);
    }

    fin();
}


function fin() {
    $('form').empty();
    $('.botonAtras').remove();
    $('h3').html('Confirmación');
    $('.container').append('<h1>¡Compra realizada!</h1>');
    $('.container').append('<a href="index.html">Volver a cartelera</a>')
}