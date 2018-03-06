
var escala = 0.1;
var trasX = 0;
var trasY = 0;
var trasladoX = 0;
var trasladoY = 0;
var anteriorX = 0;
var anteriorY = 0;
var $dragging = null;
var asientoClicado = null;
var nEntradas = 10;
var nEntradasSel = 0;
var asientos = [];
var pelicula = '';
var dia = '';
var hora = '';

function Asiento (x,y,estado, id) {
    this.x = x
    this.y = y
    this.estado = estado
    this.id = id
}

function Sala (asientos, pelicula, dia, hora){
    this.asientos = asientos
    this.pelicula = pelicula
    this.dia = dia
    this.hora = hora
}

function Entrada(pelicula, dia, hora) {
    this.pelicula = pelicula
    this.dia = dia
    this.hora = hora
}

function creaAsientosJson(x,y,estado){
	var asiento = new Asiento(x,y,estado)
	asientos.push(asiento)
}


$( document ).ready(function() {
    $('.spinner').fadeIn()
    var delayInMilliseconds = 3000;
    setTimeout(function() {
        $('.spinner').hide()
        dibujarAsientos();
        listeners();
    }, delayInMilliseconds);
});


function listeners(){
    $('#masBoton').click(function(){
        escala = Math.round((escala + 0.05) * 100)/100;
        if (escala >= 0.2)
            escala = 0.2;
        $('.escala').attr('transform', 'scale('+ escala +')')
    })

    $('#menosBoton').click(function(){
        escala = Math.round((escala - 0.05) * 100)/100;
        if (escala <= 0.1){
            escala = 0.1;
            $('.traslada').attr('transform', 'translate(0,0)');
        }
        $('.escala').attr('transform', 'scale('+ escala +')');
    });

    $(document.body).on("mousemove", function(e) {
        $('#cosa').text(e.pageX)
        move(e);
    });
    
    $('svg').on("mousedown", function (e) {
        $dragging = $(e.target);
        trasX = e.pageX;
        trasY = e.pageY;
    });

    $(document.body).on("mouseup", function (e) {
        $dragging = null;
        anteriorX = trasladoX;
        anteriorY = trasladoY;
    });

    $('.asiento').on("mousedown", function(e){
        asientoClicado = $('.traslada').attr('transform');
    })

    $('.asiento').on("mouseup", function(e){
        if (asientoClicado ==  $('.traslada').attr('transform'))
            clickAsiento($(this))
    })



    $(document.body).on("touchmove", function(e) {
        var event = window.event;
      moveMouse(event.touches[0].pageX, event.touches[0].pageY);
    });
    $('svg').on("touchstart", function (e) {
        var event = window.event;
        $dragging = $(event.target);
        trasX = event.touches[0].pageX;
        trasY = event.touches[0].pageY;
    });

    $(document.body).on("touchend", function (e) {
        $dragging = null;
        anteriorX = trasladoX;
        anteriorY = trasladoY;
    });

    $('#comprar').click(function(){
        if(nEntradasSel > 0){
            guardarPago()
            window.location.href = 'pagar.html';
        }
        else{
            alert('Debe seleccionar al menos un asiento.')
        }
            
    })

    $('.botonAtras').click(function(){
        window.location.href = 'index.html';
    });  
}


function guardarPago(){
    sala = new Sala(asientos, pelicula, dia, hora)
    var salaJson = JSON.stringify(sala);
    localStorage.setItem("sala", salaJson);
}


function move(e){
    if ($dragging) {
        if(escala > 0.1){
            trasladoX = ((e.pageX - trasX)/escala ) + anteriorX;
            if (trasladoX < -2600)
                trasladoX = -2600;
            if (trasladoX > 400)
                trasladoX = 400;
            trasladoY = ((e.pageY - trasY)/escala ) + anteriorY;
            if (trasladoY < -2600)
                trasladoY = -2600;
            if (trasladoY > 400)
                trasladoY = 400;
            $('.traslada').attr('transform', 'translate('+ trasladoX +','+ trasladoY +')');
        }
    }
}


function moveMouse(pageX, pageY){
    if ($dragging) {
        if(escala > 0.1){
            trasladoX = ((pageX - trasX)/escala -  $('#sala').offset().left) + anteriorX;
            if (trasladoX < -2600)
                trasladoX = -2600;
            if (trasladoX > 400)
                trasladoX = 400;
            trasladoY = ((pageY - trasY)/escala -  $('#sala').offset().top) + anteriorY;
            if (trasladoY < -2600)
                trasladoY = -2600;
            if (trasladoY > 400)
                trasladoY = 400;
            $('.traslada').attr('transform', 'translate('+ trasladoX +','+ trasladoY +')');
        }
    }
}


function dibujarAsientos(){
    var xmlns = "http://www.w3.org/2000/svg";
    var comienzoX = 450;
    var comienzoY = 1500;
    var espacioX = 210;
    var espacioY = 280;
    var nAsientos = 20;
    var nFilas = 10;
    var xActual = 0;
    var yActual = 0;
    var pasilloX = 420;


    if (localStorage.getItem("entradaPeli") != null) {
        var entrada = JSON.parse(localStorage.getItem("entradaPeli"))
        pelicula = entrada.pelicula;
        dia = entrada.dia;
        hora = entrada.hora;
    }

    if (localStorage.getItem("sala") === null) {
        yActual = comienzoY;
        for (let i = 0; i < nFilas; i++) {
            xActual = comienzoX;
            
            for (let j = 0; j < nAsientos; j++) {
                var asiento = document.createElementNS(xmlns, 'use')
                asiento.setAttributeNS('http://www.w3.org/1999/xlink','href', '#asiento');
                asiento.setAttributeNS(null,'x', xActual);
                asiento.setAttributeNS(null,'y', yActual);
                asiento.setAttributeNS(null,'width', '206');
                asiento.setAttributeNS(null,'height', '206');
                asiento.setAttributeNS(null,'class','asiento libre');
                asiento.setAttributeNS(null,'id',i+'_'+j);

                var asientoJson = new Asiento(xActual, yActual, 'libre', i+'_'+j);
                asientos.push(asientoJson);
    
                $('#salaAsientos').append(asiento)
                xActual += espacioX;
                if (j == 3 || j == 15)
                    xActual += pasilloX;
            }
            yActual += espacioY;
        }
        var sala = new Sala(asientos, pelicula, dia, hora);
        var salaJson = JSON.stringify(sala);
        localStorage.setItem("sala", salaJson);
    }
    else{
        sala = JSON.parse(localStorage.getItem("sala"));
        asientos = sala.asientos;
        var cont = 0;

        yActual = comienzoY;
        for (let i = 0; i < nFilas; i++) {
            xActual = comienzoX;
            
            for (let j = 0; j < nAsientos; j++) {
                if(asientos[cont].estado == 'select')
                    asientos[cont].estado = 'libre';
                var asiento = document.createElementNS(xmlns, 'use')
                asiento.setAttributeNS('http://www.w3.org/1999/xlink','href', '#asiento');
                asiento.setAttributeNS(null,'x', asientos[cont].x);
                asiento.setAttributeNS(null,'y', asientos[cont].y);
                asiento.setAttributeNS(null,'width', '206');
                asiento.setAttributeNS(null,'height', '206');
                asiento.setAttributeNS(null,'class','asiento '+ asientos[cont].estado);
                asiento.setAttributeNS(null,'id',asientos[cont].id);
    
                $('#salaAsientos').append(asiento)
                xActual += espacioX;
                if (j == 3 || j == 15)
                    xActual += pasilloX;

                cont++;
            }
            yActual += espacioY;
        }
    }  
}


function clickAsiento(asiento){
    var id = '';
    var estado = '';

        if ($(asiento).hasClass('libre')){
            if (nEntradasSel < nEntradas){
                $(asiento).toggleClass( "libre" );
                $(asiento).toggleClass( "select" );
                id = asiento["0"].attributes[6].nodeValue;
                estado = 'select';
                nEntradasSel++;
                $('#cantidad').html(nEntradasSel);
                $('#precioTotal').html(nEntradasSel * 6.50);
            }
            
        }
        else if ($(asiento).hasClass('select')){
            $(asiento).toggleClass( "libre" );
            $(asiento).toggleClass( "select" );
            id = asiento["0"].attributes[6].nodeValue;
            estado = 'libre';
            nEntradasSel--;
            $('#cantidad').html(nEntradasSel);
            $('#precioTotal').html(nEntradasSel * 6.50);
        }

        for (let i = 0; i < asientos.length; i++) {
            if (asientos[i].id == id){
                asientos[i].estado = estado;
            }
            
        }

}







