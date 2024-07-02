document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todo-input");
    const addTodoButton = document.getElementById("add-todo");
    const todoList = document.getElementById("todo-list");
    const errorMessage = document.getElementById("error-message");

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach(todo => addTodoToDOM(todo));
    }

    function saveTodosToLocalStorage(todos) {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function addTodoToDOM(todo) {
        const li = document.createElement("li");
        li.className = 'todo-item';
        li.textContent = todo;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "O'chirish";
        deleteButton.onclick = function () {
            if (confirm("Bu vazifani o'chirishni xohlaysizmi?")) {
                todoList.removeChild(li);
                deleteTodoFromLocalStorage(todo);
            }
        };

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    function addTodo() {
        const todo = todoInput.value.trim();
        const todos = JSON.parse(localStorage.getItem("todos")) || [];

        if (todo.length < 3) {
            errorMessage.textContent = "Vazifa kamida 3 ta belgidan iborat bo'lishi kerak!";
            todoInput.classList.add("invalid-input");
            return;
        }

        if (todos.includes(todo)) {
            errorMessage.textContent = "Bu vazifa allaqachon mavjud!";
            todoInput.classList.add("invalid-input");
            return;
        }

        errorMessage.textContent = "";
        todoInput.classList.remove("invalid-input");

        addTodoToDOM(todo);
        todos.push(todo);
        saveTodosToLocalStorage(todos);
        todoInput.value = "";
    }

    function deleteTodoFromLocalStorage(todo) {
        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos = todos.filter(t => t !== todo);
        saveTodosToLocalStorage(todos);
    }

    addTodoButton.addEventListener("click", addTodo);

    loadTodos();

    todoInput.addEventListener("input", function () {
        if (todoInput.value.trim().length >= 3) {
            errorMessage.textContent = "";
            todoInput.classList.remove("invalid-input");
        }
    });
});
