
function Entrada(pelicula, dia, hora) {
    this.pelicula = pelicula
    this.dia = dia
    this.hora = hora
}

var peliculas = []
var votos = []
var peliculaSeleccionada
var diaSeleccionado
var horaSeleccionada


$(document).ready(function () {
    $('#bloqueo').hide()
    $('#panelAyuda').hide()
    $('#peliculaGrande').hide()

    $('.spinner').fadeIn()
    var delayInMilliseconds = 3000;
    setTimeout(function() {
        $('.spinner').hide()
        leePeliculas()
    }, delayInMilliseconds);


})


function Pelicula(titulo, genero, anio, director, reparto, sinopsis, dias) {
    this.titulo = titulo
    this.genero = genero
    this.anio = anio
    this.director = director
    this.reparto = reparto
    this.sinopsis = sinopsis
    this.dias = dias
}


function creaPeliculasJson(titulo, genero, anio, director, reparto, sinopsis, dias) {
    var pelicula = new Pelicula(titulo, genero, anio, director, reparto, sinopsis, dias)
    peliculas.push(pelicula)
}


function leePeliculas() {
    $.getJSON('https://aschausson.github.io/movieticket/data/pelis.json', function (data) {
        for (var key in data) {
            creaPeliculasJson(data[key].titulo, data[key].genero, data[key].anio, data[key].director, data[key].reparto, data[key].sinopsis, data[key].dias)
        }
    })
        .done(function () {
            insertaPeliculas()
            listenerClickPeliculas()
        })
}


function listenerClickPeliculas() {
    $(document).keyup(function (e) {
        if (e.keyCode == 27) { //escape
            $('#bloqueo').hide()
            $('#peliculaGrande').hide()
            $('#panelAyuda').hide()
            $('body').css('overflow', 'scroll')
        }
    })

    $('#ayuda').click(function () {
        $('#bloqueo').show()
        $('#panelAyuda').show()
    })
    $('#ayuda').keypress(function (e) {
        if (e.which == 13) {//enter
            $('#bloqueo').show()
            $('#panelAyuda').show()
        }
    })

    $('.peliPequeCont').click(function () {
        peliculaGrande($(this).attr('id'))
        $('body').css('overflow', 'hidden')
        $('#peliculaGrande').scrollTop(0)
        $('#peliculaGrande').focus()
    })
    $('.peliPequeCont').keypress(function (e) {
        if (e.which == 13) {//enter
            peliculaGrande($(this).attr('id'))
            $('body').css('overflow', 'hidden')
            $('#peliculaGrande').scrollTop(0)
            $('#peliculaGrande').focus()
        }
    })

    $('#cierraAyuda').click(function () {
        $('#bloqueo').hide()
        $('#panelAyuda').hide()
    })
    $('#cierraAyuda').keypress(function (e) {
        if (e.which == 13) {//enter
            $('#bloqueo').hide()
            $('#panelAyuda').hide()
        }
    })

    $('#pgAtras').click(function () {
        $('#bloqueo').hide()
        $('#peliculaGrande').hide()
        $('#horas').empty();
        $('body').css('overflow', 'scroll')
    })
    $('#pgAtras').keypress(function (e) {
        if (e.which == 13) {//enter
            $('#bloqueo').hide()
            $('#peliculaGrande').hide()
            $('#horas').empty();
            $('body').css('overflow', 'scroll')
        }
    })

    $('#comprar').click(function(){
        guardarVoto()
    })
    
}


function insertaPeliculas() {
    for (var i = 0; i < peliculas.length; i++) {
        var sinopsisCorta = peliculas[i].sinopsis.substring(0, 180)
        $('#contenedor').append('<div id="' + i + '" class="peliPequeCont"><img aria-hidden="true" alt="' + peliculas[i].titulo + '" src="./data/img/' + (i + 1) + 'small.jpg"><h1>' + peliculas[i].titulo + '</h1><h4>Género: ' + peliculas[i].genero + '</h4><h4>Sinopsis:</h4><p>' + sinopsisCorta + '...</p></div>')
    }
}




function peliculaGrande(id) {
    peliculaSeleccionada = id
    $('#pgImagen').attr('src', './data/img/' + (parseInt(id) + 1) + 'large.jpg')
    var tit = peliculas[id].titulo
    $('#pgTitulo').html(tit)
    $('#pgGenero').html('Género: ' + peliculas[id].genero)
    $('#pgDirector').html('Director: ' + peliculas[id].director)
    $('#pgReparto').html('Reparto: ' + peliculas[id].reparto)
    $('#pgSinopsis').html(peliculas[id].sinopsis)

    botonesDias(id);

    $('#bloqueo').show();
    $('#peliculaGrande').show();
}


function botonesDias(id) {
    $('#dias').empty();
    var ancho = $(window).width();
    var dia = '';

    if (ancho < 950) dia = 'L';
    else dia = 'Lunes';
    $('#dias').append('<button id="0" class="botonDia button">' + dia + '</button>');
    if (ancho < 950) dia = 'M';
    else dia = 'Martes';
    $('#dias').append('<button id="1" class="botonDia button">' + dia + '</button>');
    if (ancho < 950) dia = 'X';
    else dia = 'Miércoles';
    $('#dias').append('<button id="2" class="botonDia button">' + dia + '</button>');
    if (ancho < 950) dia = 'J';
    else dia = 'Jueves';
    $('#dias').append('<button id="3" class="botonDia button">' + dia + '</button>');
    if (ancho < 950) dia = 'V';
    else dia = 'Viernes';
    $('#dias').append('<button id="4" class="botonDia button">' + dia + '</button>');
    if (ancho < 950) dia = 'S';
    else dia = 'Sábado';
    $('#dias').append('<button id="5" class="botonDia button">' + dia + '</button>');
    if (ancho < 950) dia = 'D';
    else dia = 'Domingo';
    $('#dias').append('<button id="6" class="botonDia button">' + dia + '</button>');

    $('.botonDia').click(function () {
        $('.botonDia').removeClass('selected');
        $(this).addClass('selected');
        diaSeleccionado = $(this).attr('id')
        botonesHoras(this);
    })
}

function botonesHoras(boton) {
    $('#horas').empty();
    var arrayHoras = [];
    var horas = '';
    if ($(boton).attr('id') == 0)
        horas = peliculas[peliculaSeleccionada].dias.lunes;
    if ($(boton).attr('id') == 1)
        horas = peliculas[peliculaSeleccionada].dias.martes;
    if ($(boton).attr('id') == 2)
        horas = peliculas[peliculaSeleccionada].dias.miercoles;
    if ($(boton).attr('id') == 3)
        horas = peliculas[peliculaSeleccionada].dias.jueves;
    if ($(boton).attr('id') == 4)
        horas = peliculas[peliculaSeleccionada].dias.viernes;
    if ($(boton).attr('id') == 5)
        horas = peliculas[peliculaSeleccionada].dias.sabado;
    if ($(boton).attr('id') == 6)
        horas = peliculas[peliculaSeleccionada].dias.domingo;

    arrayHoras = horas.split(' ');
    for (let i = 0; i < arrayHoras.length; i++) {
        $('#horas').append('<button class="botonHora button">' + arrayHoras[i] + '</button>');
    }

    $('.botonHora').click(function () {
        $('.botonHora').removeClass('selected');
        horaSeleccionada = $(this).html()
        $(this).addClass('selected');
    })
    
}


function guardarVoto() {
    if ($('.botonDia').hasClass('selected') && $('.botonHora').hasClass('selected')){
        var entrada = new Entrada(peliculas[peliculaSeleccionada].titulo, diaSeleccionado, horaSeleccionada)
        localStorage.setItem("entradaPeli", JSON.stringify(entrada))
        window.location.href = 'entradas.html';
    }
    else{
        alert('Debe de seleccionar un día y una hora.')
    }
}