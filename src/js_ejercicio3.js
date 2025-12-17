//Seleccionar elementos del HTML
const input = document.getElementById("inputTexto");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");

//Función para agregar un elemento a la lista
function agregarElemento() {
  // Obtener el texto del input
  const texto = input.value.trim();

  // Validar que no esté vacío
  if (texto === "") {
    alert("Por favor, escribe algo antes de agregar");
    return;
  }

  // Crear un nuevo elemento <li>
  const nuevoItem = document.createElement("li");

  // Crear un <span> para el texto
  const textoSpan = document.createElement("span");
  textoSpan.textContent = texto;

  // Crear el botón de eliminar
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.className = "btnEliminar";

  // Agregar evento al botón eliminar
  btnEliminar.addEventListener("click", function () {
    nuevoItem.remove();
  });

  // Agregar el span y el botón al <li>
  nuevoItem.appendChild(textoSpan);
  nuevoItem.appendChild(btnEliminar);

  // Agregar el <li> a la lista
  lista.appendChild(nuevoItem);

  // Limpiar el input
  input.value = "";

  // Devolver el foco al input
  input.focus();

  console.log("Elemento agregado:", texto);
}

//Agregar evento click al botón
btnAgregar.addEventListener("click", agregarElemento);

//Permitir agregar con la tecla Enter
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    agregarElemento();
  }
});
