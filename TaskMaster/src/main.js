import { 
  state, 
  addTask, 
  toggleTaskStatus, 
  clearPendingTasks, 
  clearCompletedTasks 
} from './js/state.js';
import { sanitizeInput } from './js/utils.js';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const imageInput = document.getElementById('image-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
const todoCount = document.getElementById('todo-count');
const doneCount = document.getElementById('done-count');
const themeToggle = document.getElementById('theme-toggle');

const clearTodoBtn = document.getElementById('clear-todo-btn');
const clearDoneBtn = document.getElementById('clear-done-btn');

function render() {
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  let pending = 0;
  let completed = 0;

  state.tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = 'task-card-item';

    // Adiciona Imagem se existir URL
    if (task.imageUrl) {
      const img = document.createElement('img');
      img.src = task.imageUrl;
      img.alt = 'Imagem da tarefa';
      img.className = 'task-card-img';
      img.onerror = () => img.remove(); // Remove se a URL for quebrada
      card.appendChild(img);
    }

    const body = document.createElement('div');
    body.className = 'task-card-body';

    const textSpan = document.createElement('span');
    textSpan.textContent = task.text;

    const actionBtn = document.createElement('button');
    actionBtn.className = 'btn-icon';
    actionBtn.textContent = task.completed ? '↩️' : '✅';
    actionBtn.addEventListener('click', () => {
      toggleTaskStatus(task.id);
      render();
    });

    body.appendChild(textSpan);
    body.appendChild(actionBtn);
    card.appendChild(body);

    if (task.completed) {
      doneList.appendChild(card);
      completed++;
    } else {
      todoList.appendChild(card);
      pending++;
    }
  });

  todoCount.textContent = pending;
  doneCount.textContent = completed;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = sanitizeInput(input.value);
  const imageUrl = sanitizeInput(imageInput.value);

  if (!text) return;

  addTask(text, imageUrl);
  input.value = '';
  imageInput.value = '';
  render();
});

clearTodoBtn.addEventListener('click', () => {
  if (confirm('Limpar todas as pendentes?')) {
    clearPendingTasks();
    render();
  }
});

clearDoneBtn.addEventListener('click', () => {
  if (confirm('Limpar todas as concluídas?')) {
    clearCompletedTasks();
    render();
  }
});

themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

render();
