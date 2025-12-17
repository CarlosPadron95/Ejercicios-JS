//Seleccionar elementos del HTML
const boton = document.getElementById("btnContar");
const textoContador = document.getElementById("contadorTexto");

//Variable para guardar el número de clics
let contadorClics = 0;

//Función que incrementa el contador
function contarClic() {
  // Incrementar el contador en 1
  contadorClics++;

  // Actualizar el texto en el HTML
  textoContador.textContent = `Clics: ${contadorClics}`;

  // Opcional: mostrar en consola
  console.log("Total de clics:", contadorClics);
}

//Agregar el evento click al botón
boton.addEventListener("click", contarClic);
