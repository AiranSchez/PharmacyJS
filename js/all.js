import { farmacias } from "./farmacias.js"

Array.prototype.unique = function () {                                  // Función que devuelve cada elemento de 1 array 1 única vez
    return this.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
}

var distritosDOM = document.getElementById('distritos');                // selecciono los elementos distritos
var distritosiniciales = farmacias.map(recorre => recorre.DISTRITO);    // Almacena todos los distritos
var distritosfinales = distritosiniciales.unique();                     // Almacena aquellos distritos 1 única vez
var barriosiniciales = farmacias.map(recorre => recorre.BARRIO);
var barriosfinales = barriosiniciales.unique();

creaSelect(distritosfinales, '#select')                                 // Creo los 2 selects con su contenido
creaSelect(barriosfinales, '#select2')

imprimirDistritos(distritosfinales, 'div', distritosDOM);               // Pinta en la web todos los distritos
creaBarrios(farmacias)                                                  // Pinta los barrios
creaFarmacias()                                                         // Pinta las farmacias

document.getElementById('boton1').addEventListener("click", filtrar);    
document.getElementById('boton2').addEventListener("click", filtrar2);
document.querySelector('#select').setAttribute('class', 'btn btn-danger align-center justify-content-md-center')
document.querySelector('#select2').setAttribute('class', 'btn btn-danger align-center justify-content-md-center')
var selector = document.querySelectorAll('button')
selector.forEach(element => {
    element.setAttribute('class', 'btn btn-info')
});

function imprimirDistritos(array, etiqueta, id) {
    for (var i = 0; i < array.length; i++) {
        var crear = document.createElement(etiqueta);                   // Crea el elemento que yo le haya indicado
        var texto = document.createTextNode(array[i]);                  // Crea el texto (nombre del distrito)
        crear.setAttribute('id', array[i])                              // Le añado ID
        crear.setAttribute('class', 'card-columns bg-secondary p-3 m-3')
        crear.appendChild(texto);                                       // Le añado el texto
        id.appendChild(crear);                                          // Pinto en la web el distrito
    }
}

function creaBarrios(objetoarecorrer){
    objetoarecorrer.forEach(element => {                                            // Pinto en la web todos los barrios
        var selectdistrito1 = document.getElementById(element.DISTRITO)             // Selecciono 1 a 1 los distritos por cada iteración
        var crear = document.createElement('div');
        var texto = document.createTextNode(element.BARRIO);                         
        crear.setAttribute('class', 'barrios card bg-warning  p-3 ' + element.BARRIO)
        crear.appendChild(texto);
        if (document.getElementsByClassName(element.BARRIO).length == 0) {          // cojo el barrio a introducir y si lenght es 0 significa que no existe
            selectdistrito1.appendChild(crear)
        }
    });
}

function creaFarmacias(){
    var buclebarrios = document.getElementsByClassName('barrios');              // Cojo todos los barrios 
    for (var i = 0; i < buclebarrios.length; i++) {                             // Recorro todos los barrios
        var barrios = document.getElementsByClassName('barrios')[i].firstChild.nodeValue // Cojo el nombre del barrio en el que estoy
        for (var j = 0; j < farmacias.length; j++) {                            // Recorro todo el array farmacias
            if (farmacias[j].BARRIO == barrios) {                               // Si el barrio en el que estoy es igual al barrio de farmacias
                var final = document.getElementsByClassName('barrios')[i];      // Cojo el elemento donde lo voy a insertar
                creacionDivina('Nombre: ', farmacias[j].NOMBRE, final)
                creacionDivina('Direccion: ', farmacias[j].DIRECCION, final)    // E inserto todo lo que va en la farmacia
                creacionDivina('Telefono: ', farmacias[j].TELEFONO, final)
                creacionDivina('Web: ', farmacias[j].WEB, final)
            }
        }
    }
}

function creaSelect(objetoarecorrer, lugar) {
    var select = document.querySelector(lugar)

    objetoarecorrer.forEach(element => {
        var creaoption = document.createElement('option');
        var option = document.createTextNode(element);
        creaoption.setAttribute('value', element)
        creaoption.appendChild(option);
        select.appendChild(creaoption)
    });

}

function filtrar() {
    const myNode = document.getElementById('distritos')
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    var busca = document.getElementById('select').value                     // Aqui tengo lo que se ha seleccionado en el filtro
    var barriosFiltrados = farmacias.filter(dis => dis.DISTRITO == busca);  // Aqui tendré los objetos que tienen como distrito lo seleccionado en busca
    var distritoaCrear = barriosFiltrados[0].DISTRITO;                      // NOMBRE DEL DISTRITO A CREAR 
    crearDeNuevo(barriosFiltrados, distritoaCrear)
}

function filtrar2(){
    const myNode = document.getElementById('distritos')
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    var busca = document.getElementById('select2').value                    // Aqui tengo lo que se ha seleccionado en el filtro
    var farmaciasFiltradas = farmacias.filter(bar => bar.BARRIO == busca);  // Aqui tendré las farmacias encontradas
    crearDeNuevo(farmaciasFiltradas,farmaciasFiltradas[0].DISTRITO)
   
}

function crearDeNuevo(barriosFiltrados, distritoaCrear) {
    // PRIMERO CREO EL DISTRITO
    creaDistrito(distritoaCrear);
    // LUEGO CREO LOS BARRIOS
    creaBarrios(barriosFiltrados);
    // AHORA CREO LAS FARMACIAS
    creaFarmacias();
}

function creaDistrito(distritoaCrear) {
    var id = document.getElementById('distritos');
    var crear = document.createElement('div');                         
    var texto = document.createTextNode(distritoaCrear);                // Crea el texto (nombre del distrito)
    crear.setAttribute('id', distritoaCrear)                            
    crear.setAttribute('class', 'card-columns bg-secondary p-3 m-3')
    crear.appendChild(texto);                                           
    id.appendChild(crear);                                              // lo pinto en la web
}


function creacionDivina(cabecera, nombrefarmacia, lugar) {
    var crearNombre = document.createElement('li');
    var nombre = document.createTextNode(cabecera + nombrefarmacia);    // cabecera-> 'Web:' 
    crearNombre.setAttribute('class', 'farmacias card-group bg-info mr-3 ')
    crearNombre.appendChild(nombre);
    if (nombre.data != 'Web: undefined') {                              // Si la web existe
        lugar.appendChild(crearNombre)                                  // la pinto en la web
    }
}

