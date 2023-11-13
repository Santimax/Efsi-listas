let tasks = [];

function agregarTarea() {
    const tareaInput = document.getElementById("taskInput");
    const tarea = tareaInput.value.trim();
    if (tarea !== "") {
        const timestampInicio = Date.now();
        const nuevaTarea = {
            id: timestampInicio,
            text: tarea,
            completed: false,
            timestampInicio: timestampInicio,
            timestampFin: null,
        };
        tasks.push(nuevaTarea);
        tareaInput.value = "";
        cargarTareas();
    }
}

function completarTarea(id) {
    const tarea = tasks.find(t => t.id === id);
    if (tarea) {
        tarea.completed = !tarea.completed;
        tarea.timestampFin = tarea.completed ? Date.now() : null;
        cargarTareas();
    }
}

function calcularTareaRapida() {
    const tareaMasRapida = tasks.reduce((tareaAnterior, tareaActual) => {
        if (tareaAnterior === null) {
            return tareaActual;
        }

        const tiempoAnterior = tareaAnterior.timestampFin - tareaAnterior.timestampInicio;
        const tiempoActual = tareaActual.timestampFin - tareaActual.timestampInicio;

        return tiempoActual < tiempoAnterior ? tareaActual : tareaAnterior;
    }, null);

    if (tareaMasRapida !== null) {
        alert(`La tarea más rápida fue: "${tareaMasRapida.text}"`);
    } else {
        alert("No hay tareas completadas para calcular la más rápida.");
    }
}

function cargarTareas() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(tarea => {
        const listItem = document.createElement("li");
        listItem.className = `list-group-item ${tarea.completed ? 'list-group-item-success' : ''}`;
        listItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span>${tarea.text}</span>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" onclick="completarTarea(${tarea.id})"
                        ${tarea.completed ? 'checked' : ''}>
                </div>
            </div>
        `;
        taskList.appendChild(listItem);
    });
}
