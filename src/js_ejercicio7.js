//Seleccionar elementos del HTML
const inputLongitud = document.getElementById("longitud");
const btnGenerar = document.getElementById("btnGenerar");
const resultado = document.getElementById("resultado");
const btnCopiar = document.getElementById("btnCopiar");
const mensajeCopiado = document.getElementById("mensajeCopiado");

//Definir los caracteres disponibles para la contraseña
const caracteres = {
  minusculas: "abcdefghijklmnopqrstuvwxyz",
  mayusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numeros: "0123456789",
  especiales: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

// Combinar todos los caracteres en un solo string
const todosLosCaracteres =
  caracteres.minusculas +
  caracteres.mayusculas +
  caracteres.numeros +
  caracteres.especiales;

//Variable para guardar la contraseña generada
let contrasenaActual = "";

//Función para generar un carácter aleatorio
function obtenerCaracterAleatorio(cadena) {
  // Genera un índice aleatorio dentro de la longitud de la cadena
  const indiceAleatorio = Math.floor(Math.random() * cadena.length);

  // Retorna el carácter en ese índice
  return cadena[indiceAleatorio];
}

//Función para generar la contraseña
function generarContrasena() {
  // Obtener la longitud deseada
  const longitud = parseInt(inputLongitud.value);

  // Validar la longitud
  if (isNaN(longitud) || inputLongitud.value.trim() === "") {
    mostrarError("Por favor, ingresa una longitud válida");
    return;
  }

  if (longitud < 4) {
    mostrarError("La longitud debe ser mayor o igual a 4");
    return;
  }

  if (longitud > 50) {
    mostrarError("La longitud máxima es 50 caracteres");
    return;
  }

  // Generar la contraseña
  let contrasena = "";

  // Asegurar que la contraseña tenga al menos un carácter de cada tipo
  contrasena += obtenerCaracterAleatorio(caracteres.minusculas);
  contrasena += obtenerCaracterAleatorio(caracteres.mayusculas);
  contrasena += obtenerCaracterAleatorio(caracteres.numeros);
  contrasena += obtenerCaracterAleatorio(caracteres.especiales);

  // Completar el resto de la contraseña con caracteres aleatorios
  for (let i = 4; i < longitud; i++) {
    contrasena += obtenerCaracterAleatorio(todosLosCaracteres);
  }

  // Mezclar los caracteres de la contraseña (para que los primeros 4 no siempre estén al inicio)
  contrasena = mezclarString(contrasena);

  // Guardar la contraseña actual
  contrasenaActual = contrasena;

  // Mostrar la contraseña
  mostrarContrasena(contrasena);

  console.log("Contraseña generada:", contrasena);
}

//Función para mezclar un string
function mezclarString(str) {
  // Convertir el string en un array de caracteres
  const array = str.split("");

  // Algoritmo de Fisher-Yates para mezclar
  for (let i = array.length - 1; i > 0; i--) {
    // Generar un índice aleatorio
    const j = Math.floor(Math.random() * (i + 1));

    // Intercambiar elementos
    [array[i], array[j]] = [array[j], array[i]];
  }

  // Convertir el array de vuelta a string
  return array.join("");
}

//Función para mostrar la contraseña
function mostrarContrasena(contrasena) {
  resultado.innerHTML = `<p class="contrasena">${contrasena}</p>`;
}

//Función para mostrar errores
function mostrarError(mensaje) {
  resultado.innerHTML = `<p class="error">${mensaje}</p>`;
}

//Agregar eventos
btnGenerar.addEventListener("click", generarContrasena);

//Permitir generar con Enter
inputLongitud.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    generarContrasena();
  }
});
