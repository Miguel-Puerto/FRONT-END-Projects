import { loadTasks, saveTasks } from './storage.js';

export const state = {
  tasks: loadTasks()
};

export function addTask(text, imageUrl = '') {
  const newTask = { 
    id: Date.now(), 
    text, 
    imageUrl, 
    completed: false 
  };
  state.tasks.push(newTask);
  saveTasks(state.tasks);
}

export function toggleTaskStatus(id) {
  const task = state.tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(state.tasks);
  }
}

export function clearPendingTasks() {
  state.tasks = state.tasks.filter(task => task.completed);
  saveTasks(state.tasks);
}

export function clearCompletedTasks() {
  state.tasks = state.tasks.filter(task => !task.completed);
  saveTasks(state.tasks);
}
