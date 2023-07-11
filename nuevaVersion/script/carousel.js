//VARIABLES
//slider (todas las slides en el container)
const slider = document.querySelector(".slider");
//todos los trais "rastro de recorrido"
const trail = document.querySelector(".trail").querySelectorAll("div");
//valor de transformacion
let value = 0;
//indice de numero en trail
let trailValue = 0;
//intervalo (duración)
let interval = 4000;

// funcion que mueve a slide 
const slide = (condition) => {
  // limpia/reinicia intervalo
  clearInterval(start);

  // actualiza value y trailValue => si el atributo pasado a slide() es increase, se invoca/ejecuta initiateINC
  if(condition === "increase") {
    initiateINC();
  } else {
    initiateDEC();
  }

  // mueve slide
  move(value, trailValue);
  // restaura/restablece animación
  animate();
  // inicia el intervalo para slides
  start = setInterval(() => slide("increase"), interval);
}

// funcion para configurar el incremento (avanzar sobre slides)
const initiateINC = () => {
  // remueve el recorrido activo para todos los trails
  trail.forEach(current => current.classList.remove("active"));

  // incrementa el valor de transform (traslado)
  if(value === 80) {
    value = 0;
  } else {
    value += 20;
  }

  //actualiza el rastro de trail basado/según value actual
  trailUpdate();
}

// funcion para configurar el decremento (retroceder sobre slides)
const initiateDEC = () => {
  // remueve recorrido activo para todos los trails
  trail.forEach(current => current.classList.remove("active"));

  // decrementa el valor de traslado (retrocede)
  if(value === 0) {
    value = 80;
  } else {
    value -= 20;
  }

  // actualiza el rastro de trail segun current value de slide
  trailUpdate();
}

// funcion para activar el transform de slide (movimiento)
const move = (S, T) => {
  // movimiento de slide 
  slider.style.transform = `translateX(-${S}%)`;

  // agrega clase active para marcar recorrido en trail
  trail[T].classList.add("active");
}

// funcion que controla la vista del estado en recorrido de slides => crea animacion de recorrido
const tl = gsap.timeline({defaults: {duration: 0.6, ease: "power2.inOut"}})
tl.from("p", {opacity: 0}, "-=0.3")
  .from("h1", {opacity: 0, y: "30px"}, "-=0.3")
  .from("button", {opacity: 0, y: "-40px"}, "-=0.8");

// funcion que reinicia la animacion tl
const animate = () => tl.restart();

// funcion que actualiza el recorrido en trail, según el valor de slide
const trailUpdate = () => {
  if(value === 0) {
    trailValue = 0;
  } else if(value === 20) {
    trailValue = 1;
  } else if(value == 40) {
    trailValue = 2;
  } else if(value === 60) {
    trailValue = 3;
  } else {
    trailValue = 4;
  }
}

// inicio de intervalo por slides 
let start = setInterval(() => slide("increase"), interval);

// next y prev buttons (botones siguiente y anterior, iconos svg con clases diferentes) 
document.querySelectorAll("svg").forEach(current => {
  // asigna una funcion según el nombre de la clase (next y prev)
  current.addEventListener("click", () => current.classList.contains("next") ? slide("increase") : slide("decrease")); // espera el evento click, .contains retorna true/false y se invoca la funcion slide() según el valor retornado por .contains, pasando como la palabra que inicia la funcion basado en la respuesta (true => ejecuta slides("increase"), false => ejecuta slides("decrease"))
})

// funcion de slide cuando trail se selecciona (permite mover las slides, tocando los contenedores de recorrido)
const clickCheck = (e) => {
  // reinicia intervalo 
  clearInterval(start);

  //remueve la clase "active" de todos los trails (rastros)
  trail.forEach(current => current.classList.remove("active"));

  // toma el trail seleccionado
  const check = e.target;
  // agrega la clase activa al trail seleccionado
  check.classList.add("active");

  // actualiza el valor de slide basado en el contenedor de rastro seleccionado
  if(check.classList.contains("box1")) {
    value = 0;
  } else if(check.classList.contains("box2")) {
    value = 20;
  } else if(check.classList.contains("box3")) {
    value = 40;
  } else if(check.classList.contains("box4")) {
    value = 60;
  } else {
    value = 80;
  }

  // actualiza el rastro (trail) según el value
  trailUpdate();
  // activa el transform (movimiento) de slide
  move(value, trailValue);
  // inicia animacion 
  animate();
  // inicia intervalo
  start = setInterval(() => slide("increase"), interval);
}

// agrega la funcion clickCheck() a todos los trails
trail.forEach(current => current.addEventListener("click", (ev) => clickCheck(ev)));

// respuesta a mobile touch en seccion de slide
const touchSlide = (() => {
  // declaración de variables de función
  let start, move, change, sliderWidth;

  // haz esto ante el toque inicial en pantalla
  slider.addEventListener("touchstart", (e) => {
    // obtener la posicion del toque x en la pantalla
    start = e.touches[0].clientX;
    // cada slide con el width del contenedor de control deslizante (trail) dividido por numero de slides
    sliderWidth = slider.clientWidth/trail.length;
  })

  // haz esto cuando se arrastra el toque por pantalla (drag)
  slider.addEventListener("touchmove", (e) => {
    // prevencion, indica una funcion por default
    e.preventDefault();
    // obtener la posicion del toque x en la pantalla cuando el arrastre (drag) se detiene
    move = e.touches[0].clientX;
    // resta la posicion inicial de la posicion final y guarda el cambio en una variable
    change = start - move;
  })

  const mobile = (e) => {
    // si change (variable que guarda el resto entre posicion inicial y posicion final) es mayor que un cuarto de slideWidth (ancho de slide) => "Next" NO DEBE HACER NADA (DO NOTHING!)
    if(change > (sliderWidth/4)) {
      slide("increase");
    } else {
      null;
    }

    // si change * -1 es mayor a un cuarto de slideWidth => "Prev" NO DEBE HACER NADA => Prev DO NOTHING!
    if((change * -1) > (sliderWidth/4)) {
      slide("decrease");
    } else {
      null;
    }

    // reinicia todas las variables a 0
    [start, move, change, sliderWidth] = [0, 0, 0, 0];
  }

  // invoca funcion mobile cuando el toque finaliza
  slider.addEventListener("touchend", mobile);
})();