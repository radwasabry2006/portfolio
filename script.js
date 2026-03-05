const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");
const sort = document.getElementById("sort");
const clearCompleted = document.getElementById("clearCompleted");
const themeToggle = document.getElementById("themeToggle");

// إضافة مهمة
addTaskButton.addEventListener("click", addTask);

function addTask() {
    if(taskInput.value.trim() === "") return;

    const li = document.createElement("li");
    li.innerHTML = `
        ${taskInput.value}
        <div class="icons">
            <span class="complete">✔</span>
            <span class="delete">✖</span>
        </div>
    `;
    taskList.appendChild(li);
    taskInput.value = "";
}

// التعامل مع الضغط على complete أو delete
taskList.addEventListener("click", function(e) {
    const target = e.target;

    if (target.classList.contains("complete")) {
        target.classList.toggle("active");
        target.parentElement.parentElement.classList.toggle("completed");
    }

    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
    }
});

// الفلترة
filter.addEventListener("change", function() {
    const tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(task => {
        switch(filter.value){
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
            case "pending":
                task.style.display = !task.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
});

// الترتيب
sort.addEventListener("change", function() {
    const tasks = Array.from(taskList.children);

    if(sort.value === "newest") {
        tasks.reverse().forEach(task => taskList.appendChild(task));
    }

    if(sort.value === "oldest") {
        tasks.forEach(task => taskList.appendChild(task));
    }
});

// حذف المكتمل
clearCompleted.addEventListener("click", function() {
    const completedTasks = document.querySelectorAll(".completed");
    completedTasks.forEach(task => task.remove());
});


themeToggle.addEventListener("change", function() {
    document.body.classList.toggle("themeToggle");
});