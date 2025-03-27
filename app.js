document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-title");
    const taskList = document.getElementById("task-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks(filter = "all") {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            if (filter === "completed" && !task.completed) return;
            if (filter === "pending" && task.completed) return;

            const li = document.createElement("li");
            li.classList.add("task");
            if (task.completed) li.classList.add("completed");

            li.innerHTML = `
                <span>${task.title}</span>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            `;
            taskList.appendChild(li);
        });
    }

    function addTask(event) {
        event.preventDefault();
        const taskTitle = taskInput.value.trim();
        if (taskTitle) {
            tasks.push({ title: taskTitle, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = "";
        }
    }

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    taskForm.addEventListener("submit", addTask);
    renderTasks();
});

document.getElementById("filters").addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        renderTasks(event.target.dataset.filter);
    }
});
