//Seleccionar elementos del HTML
const input1 = document.getElementById("numero1");
const input2 = document.getElementById("numero2");
const btnSumar = document.getElementById("btnSumar");
const btnRestar = document.getElementById("btnRestar");
const btnMultiplicar = document.getElementById("btnMultiplicar");
const btnDividir = document.getElementById("btnDividir");
const resultado = document.getElementById("resultado");

//Función para validar los números ingresados
function validarNumeros() {
  // Obtener los valores de los inputs
  const valor1 = input1.value.trim();
  const valor2 = input2.value.trim();

  // Verificar que ambos campos tengan valores
  if (valor1 === "" || valor2 === "") {
    mostrarError("Por favor, ingresa ambos números");
    return null;
  }

  // Convertir a números
  const num1 = parseFloat(valor1);
  const num2 = parseFloat(valor2);

  // Verificar que sean números válidos
  if (isNaN(num1) || isNaN(num2)) {
    mostrarError("Por favor, ingresa números válidos");
    return null;
  }

  // Retornar un objeto con ambos números
  return { num1, num2 };
}

//Función para mostrar el resultado
function mostrarResultado(operacion, valor) {
  resultado.textContent = `${operacion} = ${valor}`;
  resultado.className = "resultado exito";
}

//Función para mostrar errores
function mostrarError(mensaje) {
  resultado.textContent = mensaje;
  resultado.className = "resultado error";
}

//Función para sumar
function sumar() {
  const numeros = validarNumeros();

  if (numeros === null) return;

  const suma = numeros.num1 + numeros.num2;
  mostrarResultado(`${numeros.num1} + ${numeros.num2}`, suma);
}

//Función para restar
function restar() {
  const numeros = validarNumeros();

  if (numeros === null) return;

  const resta = numeros.num1 - numeros.num2;
  mostrarResultado(`${numeros.num1} - ${numeros.num2}`, resta);
}

//Función para multiplicar
function multiplicar() {
  const numeros = validarNumeros();

  if (numeros === null) return;

  const multiplicacion = numeros.num1 * numeros.num2;
  mostrarResultado(`${numeros.num1} × ${numeros.num2}`, multiplicacion);
}

//Función para dividir
function dividir() {
  const numeros = validarNumeros();

  if (numeros === null) return;

  // Validación especial: división por cero
  if (numeros.num2 === 0) {
    mostrarError("Error: No se puede dividir por cero");
    return;
  }

  const division = numeros.num1 / numeros.num2;
  // Redondear a 2 decimales
  const divisionRedondeada = Math.round(division * 100) / 100;
  mostrarResultado(`${numeros.num1} ÷ ${numeros.num2}`, divisionRedondeada);
}

//Agregar eventos a los botones
btnSumar.addEventListener("click", sumar);
btnRestar.addEventListener("click", restar);
btnMultiplicar.addEventListener("click", multiplicar);
btnDividir.addEventListener("click", dividir);

//Permitir usar Enter en los inputs
input1.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sumar(); // Por defecto, Enter hace la suma
  }
});

input2.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sumar(); // Por defecto, Enter hace la suma
  }
});
