var escala = 0.1;
var trasX = 0;
var trasY = 0;
var trasladoX = 0;
var trasladoY = 0;
var anteriorX = 0;
var anteriorY = 0;
var $dragging = null;
var asientoClicado = null;
var nEntradas = 4;
var nEntradasSel = 0;

$( document ).ready(function() {
    
    
    dibujarAsientos();
    listeners();
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
}


function move(e){
    if ($dragging) {
        if(escala > 0.1){
            trasladoX = ((e.pageX - trasX)/escala ) + anteriorX;
            if (trasladoX < -2600)
                trasladoX = -2600;
            if (trasladoX > 400)
                trasladoX = 400;
            trasladoY = ((e.pageY - trasY)/escala -  $('#sala').offset().top) + anteriorY;
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

            $('#salaAsientos').append(asiento)
            xActual += espacioX;
            if (j == 3 || j == 15)
                xActual += pasilloX;
        }
        yActual += espacioY;
    }

    
}



function clickAsiento(asiento){
        if ($(asiento).hasClass('libre')){
            if (nEntradasSel < nEntradas){
                $(asiento).toggleClass( "libre" );
                $(asiento).toggleClass( "select" );
                nEntradasSel++;
            }
            
        }
        else if ($(asiento).hasClass('select')){
            $(asiento).toggleClass( "libre" );
            $(asiento).toggleClass( "select" );
            nEntradasSel--;
        }

/*
	var n = 0
	$('.ret').each(function(){
		if ($(this).hasClass('select'))
			retretes[n].estado="seleccionado"
		if ($(this).hasClass('libre'))
			retretes[n].estado="libre"
		n++
	})
	var retretesJson = JSON.stringify(retretes)
    localStorage.setItem("retretes", retretesJson)
    */
}



