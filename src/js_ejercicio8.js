//Seleccionar elementos del HTML
const textoArea = document.getElementById("textoArea");
const contadorPalabras = document.getElementById("contadorPalabras");
const contadorCaracteres = document.getElementById("contadorCaracteres");
const contadorEspacios = document.getElementById("contadorEspacios");
const btnLimpiar = document.getElementById("btnLimpiar");

//Función para contar palabras
function contarPalabras(texto) {
  // Eliminar espacios al inicio y al final
  texto = texto.trim();

  // Si el texto está vacío, retornar 0
  if (texto === "") {
    return 0;
  }

  // Dividir el texto por espacios (uno o más)
  const palabras = texto.split(/\s+/);

  // Retornar el número de palabras
  return palabras.length;
}

//Función para contar caracteres (sin espacios ni saltos de línea)
function contarCaracteres(texto) {
  // Eliminar todos los espacios en blanco, tabulaciones y saltos de línea
  const textoSinEspacios = texto.replace(/\s/g, "");

  // Retornar la longitud del texto sin espacios
  return textoSinEspacios.length;
}

//Función para contar caracteres con espacios
function contarCaracteresConEspacios(texto) {
  // Simplemente retornar la longitud total del texto
  return texto.length;
}

//Función principal que actualiza todos los contadores
function actualizarContadores() {
  // Obtener el texto del textarea
  const texto = textoArea.value;

  // Calcular las estadísticas
  const palabras = contarPalabras(texto);
  const caracteres = contarCaracteres(texto);
  const caracteresConEspacios = contarCaracteresConEspacios(texto);

  // Actualizar los números en el DOM
  contadorPalabras.textContent = palabras;
  contadorCaracteres.textContent = caracteres;
  contadorEspacios.textContent = caracteresConEspacios;

  console.log({
    palabras: palabras,
    caracteres: caracteres,
    conEspacios: caracteresConEspacios,
  });
}

//Función para limpiar el textarea
function limpiarTexto() {
  // Vaciar el textarea
  textoArea.value = "";

  // Actualizar los contadores (todos volverán a 0)
  actualizarContadores();

  // Poner el foco de nuevo en el textarea
  textoArea.focus();

  console.log("Texto limpiado");
}

//Agregar evento 'input' para detectar cambios en tiempo real
textoArea.addEventListener("input", actualizarContadores);

//Agregar evento al botón limpiar
btnLimpiar.addEventListener("click", limpiarTexto);

//Actualizar contadores al cargar la página (por si hay texto inicial)
actualizarContadores();
