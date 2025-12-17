//Seleccionar elementos del HTML
const inputTarea = document.getElementById("inputTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");
const mensajeVacio = document.getElementById("mensajeVacio");
const btnLimpiarCompletadas = document.getElementById("btnLimpiarCompletadas");
const btnLimpiarTodo = document.getElementById("btnLimpiarTodo");
const totalTareas = document.getElementById("totalTareas");
const tareasCompletadas = document.getElementById("tareasCompletadas");
const tareasPendientes = document.getElementById("tareasPendientes");

//Array para guardar las tareas
let tareas = [];

//Clave para localStorage
const STORAGE_KEY = "listaTareas";

//Cargar tareas desde localStorage al iniciar
function cargarTareas() {
  // Obtener el string del localStorage
  const tareasGuardadas = localStorage.getItem(STORAGE_KEY);

  // Si existe, convertir de JSON a array
  if (tareasGuardadas) {
    tareas = JSON.parse(tareasGuardadas);
  } else {
    tareas = [];
  }

  console.log("Tareas cargadas:", tareas);
}

//Guardar tareas en localStorage
function guardarTareas() {
  // Convertir el array a string JSON y guardarlo
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
  console.log("Tareas guardadas:", tareas);
}

//Generar un ID único para cada tarea
function generarId() {
  // Usar timestamp + número aleatorio para ID único
  return Date.now() + Math.random().toString(36).substr(2, 9);
}

//Agregar una nueva tarea
function agregarTarea() {
  const texto = inputTarea.value.trim();

  // Validar que no esté vacío
  if (texto === "") {
    alert("Por favor, escribe una tarea");
    return;
  }

  // Crear objeto de tarea
  const nuevaTarea = {
    id: generarId(),
    texto: texto,
    completada: false,
    fecha: new Date().toISOString(),
  };

  // Añadir al array
  tareas.push(nuevaTarea);

  // Guardar en localStorage
  guardarTareas();

  // Limpiar input
  inputTarea.value = "";

  // Actualizar la vista
  renderizarTareas();

  // Devolver el foco al input
  inputTarea.focus();
}

//Eliminar una tarea por ID
function eliminarTarea(id) {
  // Filtrar el array para eliminar la tarea con ese ID
  tareas = tareas.filter((tarea) => tarea.id !== id);

  // Guardar cambios
  guardarTareas();

  // Actualizar la vista
  renderizarTareas();
}

// Cambiar estado de completada
function toggleCompletada(id) {
  // Buscar la tarea por ID y cambiar su estado
  const tarea = tareas.find((t) => t.id === id);

  if (tarea) {
    tarea.completada = !tarea.completada;

    // Guardar cambios
    guardarTareas();

    // Actualizar la vista
    renderizarTareas();
  }
}

//Limpiar tareas completadas
function limpiarCompletadas() {
  // Contar cuántas hay completadas
  const completadas = tareas.filter((t) => t.completada).length;

  if (completadas === 0) {
    alert("No hay tareas completadas para eliminar");
    return;
  }

  // Confirmar acción
  if (confirm(`¿Eliminar ${completadas} tarea(s) completada(s)?`)) {
    // Mantener solo las no completadas
    tareas = tareas.filter((tarea) => !tarea.completada);

    // Guardar cambios
    guardarTareas();

    // Actualizar la vista
    renderizarTareas();
  }
}

//Eliminar todas las tareas
function limpiarTodo() {
  if (tareas.length === 0) {
    alert("No hay tareas para eliminar");
    return;
  }

  // Confirmar acción
  if (confirm("¿Eliminar TODAS las tareas?")) {
    tareas = [];

    // Guardar cambios
    guardarTareas();

    // Actualizar la vista
    renderizarTareas();
  }
}

//Actualizar estadísticas
function actualizarEstadisticas() {
  const total = tareas.length;
  const completadas = tareas.filter((t) => t.completada).length;
  const pendientes = total - completadas;

  totalTareas.textContent = `Total: ${total}`;
  tareasCompletadas.textContent = `Completadas: ${completadas}`;
  tareasPendientes.textContent = `Pendientes: ${pendientes}`;
}

//Renderizar todas las tareas en el DOM
function renderizarTareas() {
  // Limpiar la lista actual
  listaTareas.innerHTML = "";

  // Si no hay tareas, mostrar mensaje
  if (tareas.length === 0) {
    mensajeVacio.classList.add("visible");
    listaTareas.style.display = "none";
  } else {
    mensajeVacio.classList.remove("visible");
    listaTareas.style.display = "block";

    // Crear elementos para cada tarea
    tareas.forEach((tarea) => {
      const li = crearElementoTarea(tarea);
      listaTareas.appendChild(li);
    });
  }

  // Actualizar estadísticas
  actualizarEstadisticas();
}

//Crear el elemento HTML de una tarea
function crearElementoTarea(tarea) {
  // Crear el <li>
  const li = document.createElement("li");
  li.className = "tarea-item";

  // Añadir clase si está completada
  if (tarea.completada) {
    li.classList.add("completada");
  }

  // Crear checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = tarea.completada;
  checkbox.addEventListener("change", () => toggleCompletada(tarea.id));

  // Crear span con el texto
  const span = document.createElement("span");
  span.className = "tarea-texto";
  span.textContent = tarea.texto;

  // Crear botón eliminar
  const btnEliminar = document.createElement("button");
  btnEliminar.className = "btn-eliminar";
  btnEliminar.textContent = "✕";
  btnEliminar.addEventListener("click", () => eliminarTarea(tarea.id));

  // Ensamblar todo
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(btnEliminar);

  return li;
}

//Agregar eventos
btnAgregar.addEventListener("click", agregarTarea);
btnLimpiarCompletadas.addEventListener("click", limpiarCompletadas);
btnLimpiarTodo.addEventListener("click", limpiarTodo);

//Permitir agregar con Enter
inputTarea.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    agregarTarea();
  }
});

//Inicializar la aplicación
function inicializar() {
  // Cargar tareas del localStorage
  cargarTareas();

  // Renderizar las tareas
  renderizarTareas();

  console.log("Aplicación iniciada");
}

// Ejecutar al cargar la página
inicializar();
