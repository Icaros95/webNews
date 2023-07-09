//variables
const img_con_0 = document.querySelector(".img-con-0");
const img_con_1 = document.querySelector(".img-con-1");
const img_con_2 = document.querySelector(".img-con-2");

const next = document.getElementById("next");
const prev = document.getElementById("prev");

const dots = document.querySelectorAll(".dots--dot");
const elements = document.querySelectorAll(".slider--container");
const images = ["https://images.alphacoders.com/247/247893.jpg",
                "https://images.alphacoders.com/247/247893.jpg",
                "https://images.alphacoders.com/247/247893.jpg"
            ];

let current = 0;
let i = 0;
let k = 0;

//configuracion de botones next and prev => event onclick in button, ejecuta funciones correspondientes.
next.onclick = () => goNext();
prev.onclick = () => goPrev();

//funcion goNext() => avanza sobre carrusel 
const goNext = () => {
    let temp = images[0];
    for(let index = 0; index < images.length; index++){
        images[index] = images[index +1];
        if(index === images.length -1) {
            images[index] = temp;
        }
    }
    if (k === images.length -1) {
        k = 0;
    } else {
        k++;
    }

    changeDot(k);
    change();
}

//funcion goPrev() => retrocede sobre carrusel, regresa a imagen anterior.
const goPrev = () => {
    let temp = images[images.length -1];
    for(let index = images.length; index >= 0; index--) {
        images[index] = images[index - 1];
        if(index === 0) {
            images[index] = temp;
        }
    }
    if (k >= 1) {
        k--;
    } else {
        k = 2;
    }

    changeDot(k);
    change();
}

//funcion changeDot() => cambia el indicador dot inferior cada vez que la imagen avanza o retrocede
const changeDot = (p) => {
    let dot = document.getElementsByClassName("active");
    dot[0].className = dot[0].className.replace(" active", "");
    document.querySelectorAll(".dots--dot")[p].classList.add("active");
}

//recorrido por dots
[...dots].forEach((element, p) => {
    element.addEventListener("click", (e) => {
        let dot = document.getElementById("active");
        dot[0].className = dot[0].className.replace(" active", "");
        e.target.classList.add("active");

        if(p > current) {
            goNext();
        }
        else if (p < current) {
            goPrev();
        }
        changeDot(p);
        current = p;
    });
});

//funcion que controla el cambio de imagenes/slides
const change = () => {
    let array = [...elements];
    array.push(array.shift());
    array.reduce((p, element) => {
      return p
        .then(() => new Promise(resolve => {
        const fn = (e) => {
          element.removeEventListener('transitionend', fn);
          resolve();
        };
        element.style.transition = "opacity .15s ease-out";
        element.addEventListener('transitionend', fn);
        element.style.opacity = "0";
      }))
    }, Promise.resolve());

    let timer = setTimeout(() => {
        img_con_0.style.backgroundImage = "url("+images[i + 1] +")";
        img_con_1.style.backgroundImage = "url("+images[i]+")";
        img_con_2.style.backgroundImage = "url("+images[i + 2] +")";

        [...elements].reduce((p, element) => {
            return p
            .then(() => new Promise((resolve) => {
                const fn = (e) => {
                    element.removeEventListener("transitionend", fn);
                    resolve();
                };
                element.style.transition = "opacity 0.1s ease-in";
                element.addEventListener("transitioned", fn);
                element.style.opacity = 1;              
            }))
        }, Promise.resolve(clearInterval(timer)));
    }, 500);
}