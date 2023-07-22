//acceder e importar los recursos del 'json' que contiene mi informacion
import data from './data.js';

//mapeo de data => trabajar sobre cada elemento del array => extraer del array la noticia que necesite
let socialArray = data.map(item => item.sociales.firstNew);
let economyArray = data.map(item => item.economia.secondNew);
let globalArray = data.map(item => item.global.thirdNew);
let scienceArray = data.map(item => item.ciencia.fourthNew);
let entertaimentArray = data.map(item => item.entretenimiento.fivethNew);


//variables de segmentos => selecciona el boton
let socialBtn = document.querySelector('#social');
let economyBtn = document.querySelector('#economy');
let globalBtn = document.querySelector('#global');
let scienceBtn = document.querySelector('#science');
let entertaimentBtn = document.querySelector('#entertaiment');

//seccion en la que inyectar las cards
const cardContainer = document.querySelector(".card-container")

//sin la necesidad de que se presione un boton, la primera vista se imprime en ejecucion
drawCards(globalArray);

//reaccion al evento de seleccion en cada boton
socialBtn.addEventListener('click', () => {
    drawCards(socialArray);
});

economyBtn.addEventListener('click', () => {
   drawCards(economyArray);
});

globalBtn.addEventListener('click', () => {
    drawCards(globalArray);
});

scienceBtn.addEventListener('click', () => {
    drawCards(scienceArray);
});

entertaimentBtn.addEventListener('click', () => {
    drawCards(entertaimentArray);
});

//funcion que 'dibuja' las tarjetas en el documento
function drawCards(arrayNews) {
    cardContainer.innerHTML = "";
    arrayNews.forEach(element => {
        cardContainer.innerHTML += `
        <div class="card" style="background-image: linear-gradient(rgba(5, 7, 12, 0.75), rgba(5, 7, 12, 0.75)), url(${element.background});">
                <div class="card__title">
                    <p class="title">${element.title}</p>
                </div>
                <div class="card__details">
                    <p class="details">${element.content}</p>
                </div>
                <div class="card__btn">
                    <a class="card-anchor" href="${element.anchor}">Continuar leyendo</a>
                </div>
            </div>
        `
    });
};