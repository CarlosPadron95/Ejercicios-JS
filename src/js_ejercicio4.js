//Seleccionar elementos del HTML
const inputFiltro = document.getElementById("filtro");
const listaAnimales = document.getElementById("listaAnimales");
// Obtenemos todos los <li> de la lista para iterar sobre ellos
const elementosLista = listaAnimales.getElementsByTagName("li");

//Función de filtrado
function filtrarLista() {
  // Tomar el valor del input y convertirlo a minúsculas
  const textoBusqueda = inputFiltro.value.toLowerCase();

  // Recorrer todos los elementos de la lista
  for (let i = 0; i < elementosLista.length; i++) {
    const elemento = elementosLista[i];

    // Obtener el texto del elemento y convertirlo a minúsculas
    const textoElemento = elemento.textContent.toLowerCase();

    // Lógica de filtrado: Si el texto del elemento incluye el texto de búsqueda...
    if (textoElemento.includes(textoBusqueda)) {
      // Mostrar el elemento
      elemento.style.display = "";
    } else {
      // Ocultar el elemento
      elemento.style.display = "none";
    }
  }
}

//Asignar el evento 'input' para que la función se ejecute al escribir
inputFiltro.addEventListener("input", filtrarLista);

console.log("Filtro de búsqueda en tiempo real listo.");
