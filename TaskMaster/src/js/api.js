const API_BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

/**
 * Busca todas as tarefas cadastradas no servidor
 */
export async function fetchTasksFromAPI() {
  try {
    const response = await fetch(`${API_BASE_URL}?_limit=5`);
    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

/**
 * Envia uma nova tarefa para ser salva no servidor
 */
export async function createTaskInAPI(taskData) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
  }
}

/**
 * Deleta uma tarefa no servidor pelo ID
 */
export async function deleteTaskFromAPI(id) {
  try {
    await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('API Error:', error);
  }
}
