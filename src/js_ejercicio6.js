//Seleccionar elementos del HTML
const display = document.getElementById("display");
const btnIniciar = document.getElementById("btnIniciar");
const btnPausar = document.getElementById("btnPausar");
const btnReiniciar = document.getElementById("btnReiniciar");

//Variables para controlar el temporizador
let segundos = 0;
let minutos = 0;
let horas = 0;
let intervalo = null; // Guardará la referencia del setInterval
let corriendo = false; // Estado del temporizador

//Función para actualizar el display
function actualizarDisplay() {
  // Formatear los números para que siempre tengan 2 dígitos
  const horasFormateadas = horas.toString().padStart(2, "0");
  const minutosFormateados = minutos.toString().padStart(2, "0");
  const segundosFormateados = segundos.toString().padStart(2, "0");

  // Actualizar el texto del display
  display.textContent = `${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
}

//Función para incrementar el tiempo
function incrementarTiempo() {
  segundos++;

  // Si los segundos llegan a 60, reiniciar y sumar un minuto
  if (segundos === 60) {
    segundos = 0;
    minutos++;

    // Si los minutos llegan a 60, reiniciar y sumar una hora
    if (minutos === 60) {
      minutos = 0;
      horas++;
    }
  }

  // Actualizar el display después de cada incremento
  actualizarDisplay();
}

//Función para iniciar el temporizador
function iniciar() {
  if (corriendo) return; // Si ya está corriendo, no hacer nada

  corriendo = true;

  // setInterval ejecuta una función cada X milisegundos
  // 1000 ms = 1 segundo
  intervalo = setInterval(incrementarTiempo, 1000);

  // Actualizar estado de los botones
  btnIniciar.disabled = true;
  btnPausar.disabled = false;

  console.log("Temporizador iniciado");
}

//Función para pausar el temporizador
function pausar() {
  if (!corriendo) return; // Si no está corriendo, no hacer nada

  corriendo = false;

  // clearInterval detiene el setInterval
  clearInterval(intervalo);
  intervalo = null;

  // Actualizar estado de los botones
  btnIniciar.disabled = false;
  btnPausar.disabled = true;

  console.log("Temporizador pausado en:", display.textContent);
}

//Función para reiniciar el temporizador
function reiniciar() {
  // Detener el temporizador si está corriendo
  if (corriendo) {
    clearInterval(intervalo);
    intervalo = null;
    corriendo = false;
  }

  // Resetear todas las variables
  segundos = 0;
  minutos = 0;
  horas = 0;

  // Actualizar el display
  actualizarDisplay();

  // Actualizar estado de los botones
  btnIniciar.disabled = false;
  btnPausar.disabled = true;

  console.log("Temporizador reiniciado");
}

//Agregar eventos a los botones
btnIniciar.addEventListener("click", iniciar);
btnPausar.addEventListener("click", pausar);
btnReiniciar.addEventListener("click", reiniciar);
