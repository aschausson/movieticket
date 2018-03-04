
var votos = []
var totalVotos = 0

var info = [
    ['Memento', 0],
    ['Terminator 2: El juicio final', 0],
    ['Origen', 0],
    ['Mary Poppins', 0],
    ['Regreso al futuro', 0],
    ['Cadena perpetua', 0],
    ['Avatar', 0],
    ['Ex Machina', 0],
    ['Mad Max: Furia en la carretera', 0],
    ['Los goonies', 0]
]


$(document).ready(function (){
    if (localStorage.getItem("votosPelis") === null) {

    }
    else {
        votos = JSON.parse(localStorage.getItem("votosPelis"))
    }

    prueba1 = info[2][0]
    prueba2 = info[2][1]
    prueba3 = votos[0].pelicula

    for (let j = 0; j < votos.length; j++) {
        for (var i = 0; i < info.length; i++) {
            if (info[i][0] == votos[j].pelicula) {
                info[i][1] = info[i][1] + 1
                totalVotos++
            }
        }
    }

    $('#botonTarta').click(graficaPastel)
    $('#botonColumna').click(graficaColumna)
    $('#botonDonut').click(graficaDonut)

    $('#atrasResultado').click(irAtras)
    $('#atrasResultado').keypress(function (e) {
        if (e.which == 13) {//enter
            irAtras()
        }
    })
    graficaPastel()
    crearAriaLabels()
})


// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Película');
    data.addColumn('number', 'Votos');
    data.addRows(info);

    // Set chart options
    var options = {
        'title': 'Reparto de votos MovieRate',
        'width': $('.divGrafica').width() - 10,
        'height': $('.divGrafica').height() - 30,
        backgroundColor: '#f1f1f1',
        is3D: true,
        vAxis: { textPosition: 'in' },
        chartArea: {
            left: 0,
            width: $('.divGrafica').width() - 10
        },
        legend: {
            maxLines: 1,
            textStyle: {
                fontSize: 15
            }
        },
        titleTextStyle: {
            fontSize: 20
        }
    }

    $('#pastel').show()
    $('#columna').show()
    $('#donut').show()

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('pastel'));
    chart.draw(data, options);

    var chart = new google.visualization.BarChart(document.getElementById('columna'));
    chart.draw(data, options);

    var optionsDonut = {
        'title': 'Reparto de votos MovieRate',
        'width': $('.divGrafica').width() - 10,
        'height': $('.divGrafica').height() - 30,
        backgroundColor: '#f1f1f1',
        is3D: false,
        pieHole: 0.3,
        chartArea: {
            left: 0,
            width: $('.divGrafica').width() - 10
        },
        legend: {
            maxLines: 1,
            textStyle: {
                fontSize: 15
            }
        },
        titleTextStyle: {
            fontSize: 20
        }
    }

    var chart = new google.visualization.PieChart(document.getElementById('donut'));
    chart.draw(data, optionsDonut);

    $('#columna').hide()
    $('#donut').hide()

    $('#pastel').find('#defs').remove()
    $('#donut').find('#defs').remove()
}



function graficaPastel() {
    $('#botonTarta').removeClass('botonesInactivo').addClass('botonesActivo')
    $('#botonColumna').removeClass('botonesActivo').addClass('botonesInactivo')
    $('#botonDonut').removeClass('botonesActivo').addClass('botonesInactivo')

    $('#pastel').show()
    $('#columna').hide()
    $('#donut').hide()
}


function graficaColumna() {
    $('#botonTarta').removeClass('botonesActivo').addClass('botonesInactivo')
    $('#botonColumna').removeClass('botonesInactivo').addClass('botonesActivo')
    $('#botonDonut').removeClass('botonesActivo').addClass('botonesInactivo')

    $('#pastel').hide()
    $('#columna').show()
    $('#donut').hide()
}


function graficaDonut() {
    $('#botonTarta').removeClass('botonesActivo').addClass('botonesInactivo')
    $('#botonColumna').removeClass('botonesActivo').addClass('botonesInactivo')
    $('#botonDonut').removeClass('botonesInactivo').addClass('botonesActivo')

    $('#pastel').hide()
    $('#columna').hide()
    $('#donut').show()
}

function irAtras() {
    window.location.href = 'index.html'
}

function crearAriaLabels() {
    var aria = ''
    for (let i = 0; i < info.length; i++) {
        if (info[i][1] > 0) {
            if (info[i][1] == 1)
                aria += info[i][0] + ' tiene ' + info[i][1] + ' voto de ' + totalVotos + '. '
            else
                aria += info[i][0] + ' tiene ' + info[i][1] + ' votos de ' + totalVotos + '. '
        }
    }
    $('#pastel').attr('aria-label', aria)
    $('#columna').attr('aria-label', aria)
    $('#donut').attr('aria-label', aria)
}