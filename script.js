const apiUrl = 'https://jsonplaceholder.typicode.com/todos'; // URL de la API para tareas
const taskList = document.getElementById('task-list'); // Obtiene el elemento de la lista de tareas
const taskForm = document.getElementById('task-form'); // Obtiene el formulario de tareas
const taskInput = document.getElementById('task-input'); // Obtiene el campo de entrada de tareas

// Función para obtener y mostrar tareas desde la API
async function fetchTasks() {
    try {
        const response = await fetch(apiUrl); // Realiza una solicitud GET a la API
        const tasks = await response.json(); // Convierte la respuesta a JSON
        displayTasks(tasks); // Llama a la función para mostrar las tareas
    } catch (error) {
        console.error('Error fetching tasks:', error); // Maneja y muestra errores de la solicitud
    }
}

// Función para mostrar tareas en la lista
function displayTasks(tasks) {
    taskList.innerHTML = ''; // Limpia la lista de tareas actual
    tasks.forEach(task => { // Itera sobre cada tarea
        const li = document.createElement('li'); // Crea un nuevo elemento de lista
        li.textContent = task.title; // Establece el texto del elemento de lista
        const deleteBtn = document.createElement('button'); // Crea un nuevo botón de eliminar
        deleteBtn.textContent = 'Eliminar'; // Establece el texto del botón
        deleteBtn.classList.add('delete-btn'); // Añade la clase para estilos
        deleteBtn.onclick = () => deleteTask(task.id, li); // Asigna la función de eliminar a un clic
        li.appendChild(deleteBtn); // Añade el botón al elemento de lista
        taskList.appendChild(li); // Añade el elemento de lista a la lista de tareas
    });
}

// Maneja la sumisión del formulario para agregar una nueva tarea
taskForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    const taskTitle = taskInput.value; // Obtiene el valor del campo de entrada
    if (taskTitle) { // Si el campo de entrada no está vacío
        try {
            const response = await fetch(apiUrl, { // Realiza una solicitud POST a la API para agregar una tarea
                method: 'POST', // Método de solicitud POST
                headers: {
                    'Content-Type': 'application/json', // Tipo de contenido JSON
                },
                body: JSON.stringify({ // Crea el cuerpo de la solicitud en formato JSON
                    title: taskTitle,
                    completed: false, // Marca la tarea como no completada
                }),
            });
            const newTask = await response.json(); // Convierte la respuesta a JSON
            const li = document.createElement('li'); // Crea un nuevo elemento de lista
            li.textContent = newTask.title; // Establece el texto del elemento de lista
            const deleteBtn = document.createElement('button'); // Crea un nuevo botón de eliminar
            deleteBtn.textContent = 'Eliminar'; // Establece el texto del botón
            deleteBtn.classList.add('delete-btn'); // Añade la clase para estilos
            deleteBtn.onclick = () => deleteTask(newTask.id, li); // Asigna la función de eliminar a un clic
            li.appendChild(deleteBtn); // Añade el botón al elemento de lista
            taskList.appendChild(li); // Añade el elemento de lista a la lista de tareas
            taskInput.value = ''; // Limpia el campo de entrada
        } catch (error) {
            console.error('Error adding task:', error); // Maneja y muestra errores de la solicitud
        }
    }
});

// Función para eliminar una tarea
async function deleteTask(taskId, listItem) {
    try {
        await fetch(`${apiUrl}/${taskId}`, { // Realiza una solicitud DELETE a la API para eliminar una tarea
            method: 'DELETE', // Método de solicitud DELETE
        });
        taskList.removeChild(listItem); // Elimina el elemento de lista del DOM
    } catch (error) {
        console.error('Error deleting task:', error); // Maneja y muestra errores de la solicitud
    }
}

// Llama a la función para obtener tareas al cargar la página
fetchTasks();
