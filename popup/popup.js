let tasks = [];

const addTaskBtn = document.querySelector("#add-task-btn");
addTaskBtn.addEventListener("click", () => addTask()
);

chrome.storage.sync.get(["tasks"], (res) => {
    tasks = res.tasks ? res.tasks : [];
    renderTask()
})

function saveTasks(){
    chrome.storage.sync.set({
        tasks,
    })
}

function renderTasks(taskNum){
    const taskRow = document.createElement("div");

    const text = document.createElement("input");
    text.type = "text";
    text.placeholder = "Enter a Task...";
    text.value = tasks[taskNum];
    text.addEventListener("change", () => {
        tasks[taskNum] = text.value;
        saveTasks();
    })

    const deleteBtn = document.createElement("input");
    deleteBtn.type = "button";
    deleteBtn.value = "X";
    deleteBtn.addEventListener("click", () => {
        deleteTask(taskNum);
    })

    taskRow.appendChild(text);
    taskRow.appendChild(deleteBtn);

    const taskContainer = document.querySelector("#task-container");
    taskContainer.appendChild(taskRow);
}

function addTask() {
    const taskNum = tasks.length;
    tasks.push("");
    renderTasks(taskNum);
    saveTasks();
}

function deleteTask(taskNum){
    tasks.splice(taskNum, 1);
    renderTask();
    saveTasks();
}

function renderTask(){
    const taskContainer = document.querySelector("#task-container")
    taskContainer.textContent = ""
    tasks.forEach((taskText, taskNum) => {
        renderTasks(taskNum)
    })
}