const CUADRICULA = document.querySelectorAll('.grid div');
const PUNTUACION = document.querySelector('span');
const BOTONSTART = document.querySelector('.start');
const NUEVACUADRICULA = document.getElementsByClassName('rps');
let mediaQuery = window.matchMedia("(max-width: 388px)");
// Variables que son objetos con propiedades, las cuales voy a ir llamando segun necesite.
let ancho = 20;
let movimiento = 0;
let manzana = 0;
let serpiente = [2,1,0]; //NOTA: el [0] es el 1er element del array, yo lo llamo la cabeza.
let direction = 1;
let puntaje = 0;
let velocidad = 10;
let intervaloTiempo = 0;
let intervalo = 0;


//NOTA: el código de CUADRICULA[ejemplo] son las propiedades de los objetos
//que se los pasamos a la cuadricula de la pantalla del juego.

//Comenzar o reinicar el juego
function startGame() {

	if(mediaQuery.matches) {
  	ancho = 15;
	}

	//Ejecutame el array index osea '1' de la serpiente y a la cuadricula le sacas ese index
	//osea le quitas un circulo a la serpiente. 
	serpiente.forEach(Index => CUADRICULA[Index].classList.remove('snake'));
	//A la cuadricula le paso las propiedades de la manzana.
	CUADRICULA[manzana].classList.remove('apple');
	clearInterval(intervalo);
	puntaje = 0;
	randomApple(); //Ahora, una vez que interpreta el código de arriba, llamame a la función.

	direction = 1;
	PUNTUACION.innerHTML = puntaje;
	intervaloTiempo = 1000; //Se mueve cada 1 seg, Cuando se pone start.
	serpiente = [2, 1, 0];
	movimiento = 0;

	//Ahora ejecutame la serpiente, es decir, agregame en circulo en un intervalo de tiempo.
	serpiente.forEach(Index => CUADRICULA[Index].classList.add('snake'));
	//Me lo vas a agregar (circulo) en un determinado intervalo cuando se ejecute la función
	//moveOutcomes cada 1s ques es el intervalo de tiempo.
	intervalo = setInterval(moveOutcomes, intervaloTiempo);
	BOTONSTART.classList.toggle('red');
}

//Función para generar nueva manzana una vez que se la come
function randomApple() {
	do {
		if (mediaQuery.matches) {
			manzana = Math.floor(Math.random() * NUEVACUADRICULA.length);
		} else {
		//Colocame una manzana random a lo largo de toda la cuadricula y poneme una condición.
		manzana = Math.floor(Math.random() * CUADRICULA.length); }
		//Colocame la manzana en cualquier cuadricula menos en las que tienen la clase 'snake'
	} while(CUADRICULA[manzana].classList.contains('snake'))
	//A la manzana le vas agregar la clase 'apple' que es un circulo rojo. 
	CUADRICULA[manzana].classList.add('apple');
}

//Función con la logica de las serpiente
function moveOutcomes() {
	//Conciones para dar un game over con los bordes
	if( (serpiente[0] % ancho == ancho -1 && direction == 1) ||
		(serpiente[0] + ancho >= (ancho*ancho) && direction == ancho) || 
		(serpiente[0] % ancho == 0 && direction == -1) || 
		(serpiente[0] - ancho < 0 && direction == -ancho) ||
		//Concion para dar un game over cuando se come su cuerpo.
		CUADRICULA[serpiente[0]+direction].classList.contains('snake')
		) {
		alert(`Game Over! tu puntaje es : ${puntaje}`);
		return clearInterval(intervalo); //Detiene el intervalo que contiene el setInterval.
	};

	//Cuando pase por todas las condiciones.
	//Por cada movimiento que DE la serpiente en la cuadricula sea cualquier dirección:

	//Removeme la cola de la serpiente y a su vez sacale la clase 'snake'.
	const tail = serpiente.pop()
	CUADRICULA[tail].classList.remove('snake');
	//Luego agregale esa cola en la parte de la cabeza a la serpiente segun su dirección.
	//Ojo esto es solo movimiento, la serpiente no cree todavia, solo se mueve.
	serpiente.unshift(serpiente[0]+direction);

	//Condición: si la cabeza de la serpiente toca un casillero que tiene la clase 'apple'
	//es decir, se come la manzana, me vas a ejecutar lo siguiente:
	if (CUADRICULA[serpiente[0]].classList.contains('apple')) {
		//Removeme de la cabeza de la serpiente la manzana.
		CUADRICULA[serpiente[0]].classList.remove('apple');
		//Agregale un circulo a la cola de las serpiente.
		CUADRICULA[tail].classList.add('snake');
		//Agregale un circulo permanente a la serpiente, aca crece.
		serpiente.push(tail);
		//Sumame un puntaje.
		puntaje++;
		PUNTUACION.textContent = puntaje;
		//Generame una nueva manzana en la cuadricula.
		randomApple();
		//Deteneme el intervalo de tiempo de movimiento.
		clearInterval(intervalo);
		//Colocamos el intervalo de tiempo de movimiento, es decir, se mueve mas rápido.
		intervaloTiempo = intervaloTiempo - velocidad;
		//Ahora actualizamos para que se agrege la nueva velocidad de las serpiente. Aumenta la dificultad.
		intervalo = setInterval(moveOutcomes, intervaloTiempo);
	};
	CUADRICULA[serpiente[0]].classList.add('snake');
}

//Logica de las teclas del teclado para poder juegar.
function control(e) {
	CUADRICULA[movimiento].classList.remove('snake');
	if (e.keyCode === 39) {
		direction = 1;
	} else if (e.keyCode === 38) {
		direction = -ancho;
	} else if (e.keyCode === 37) {
		direction = -1;
	} else if (e.keyCode === 40) {
		direction = +ancho;
	}
	moveOutcomes();
};


function moveUp() {
	direction = -ancho;
	moveOutcomes();
};
function moveDown() {
	direction = +ancho;
	moveOutcomes();
};
function moveLeft() {
	direction = -1; 
	moveOutcomes();
};
function moveRight() {
	direction = 1;
	moveOutcomes();
};
const UP = document.getElementById('up');
const DOWN = document.getElementById('down');
const LEFT = document.getElementById('left');
const RIGHT = document.getElementById('right');

UP.addEventListener('click', moveUp);
DOWN.addEventListener('click', moveDown);
LEFT.addEventListener('click', moveLeft);
RIGHT.addEventListener('click', moveRight);





// Inicialize the variables
/*var touchStartX = 0;
var touchStartY = 0;
var touchEndX = 0;
var touchEndY = 0;


// Add the event
NUEVACUADRICULA[0].addEventListener('touchstart', function(event) {
// Change the variables (start)
touchStartX = event.changedTouches[0].screenX;
touchStartY = event.changedTouches[0].screenY;

});

NUEVACUADRICULA[0].addEventListener('touchend', function(event) {
// Change the needed variables (end)
touchEndX = event.changedTouches[0].screenX;
touchEndY = event.changedTouches[0].screenY;
// Do the action
WhatImustDo();
});

function WhatImustDo() {
// Put a mensage in the console
	if (touchEndX < touchStartX) { 
		console.log('you moved left');
		direction = -1; 
		moveOutcomes();
	}; 
	if (touchEndX > touchStartX) {
		console.log('you moved right');
		direction = 1;
		moveOutcomes();
	};
	if (touchEndY < touchStartY) { 
		console.log('you moved down');
		direction = +ancho;
		moveOutcomes(); 
	}; 
	if (touchEndY > touchStartY) {
		console.log('you moved up');
		direction = -ancho;
		moveOutcomes();
	};
	if (touchEndY == touchStartY & touchEndX == touchStartX) {
		console.log('you tapped the screen');
	};
};
*/



document.addEventListener('keyup', control);
BOTONSTART.addEventListener('click', startGame)

