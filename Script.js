let tareas = [];

const form = document.querySelector('form');
form.addEventListener('submit', agregarTarea);

function agregarTarea(event) {
  event.preventDefault();
  const input = document.querySelector('input');
  tareas.push({text: input.value, done: false});
  input.value = '';
  mostrarTareas();
}

function tachar(index) {
  tareas[index].done = !tareas[index].done;
  mostrarTareas();
}

function mostrarTareas() {
  const ul = document.querySelector('ul');
  ul.innerHTML = '';
  tareas.forEach((tareas, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tareas.done;
    checkbox.classList.add('mr-2');
    checkbox.addEventListener('click', () => tachar(index));
    li.appendChild(checkbox);
    const text = document.createElement('span');
    text.textContent = tareas.text;
    if (tareas.done) {
      text.style.textDecoration = 'line-through';
    }
    li.appendChild(text);
    ul.appendChild(li);
  });
}

const button = document.querySelector('button');
button.addEventListener('click', mostrarTareas);