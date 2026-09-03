// Estado da Aplicação
const state = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || []
};

// Seletores do DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');

function saveState() {
  localStorage.setItem('tasks', JSON.stringify(state.tasks));
}

function renderTasks() {
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  state.tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-card';
    li.innerHTML = `
      <span>${task.text}</span>
      <button onclick="toggleTask(${index})">${task.completed ? '↩️' : '✅'}</button>
    `;

    if (task.completed) {
      doneList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
  });

  saveState();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  state.tasks.push({ text, completed: false });
  input.value = '';
  renderTasks();
});

window.toggleTask = function(index) {
  state.tasks[index].completed = !state.tasks[index].completed;
  renderTasks();
};

// Inicialização
renderTasks();
