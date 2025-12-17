//Seleccionar el botón del HTML
const boton = document.getElementById("btnCambiarColor");

//Función que genera un color aleatorio en formato RGB
function generarColorAleatorio() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
}

//Función que cambia el color de fondo
function cambiarColor() {
  const nuevoColor = generarColorAleatorio();
  document.body.style.backgroundColor = nuevoColor;
  console.log("Color generado:", nuevoColor);
}

//Agregar el evento click al botón
boton.addEventListener("click", cambiarColor);
