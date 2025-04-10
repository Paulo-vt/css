document.addEventListener("DOMContentLoaded", () => {
  const listForm = document.getElementById("list-form");
  const taskForm = document.getElementById("task-form");
  const listsContainer = document.getElementById("lists-container");

  let currentListId = null;
  let currentTaskId = null;
  let editingTask = false;

  let lists = JSON.parse(localStorage.getItem("lists")) || [];

  const displayLists = () => {
    listsContainer.innerHTML = "";
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      const listElement = document.createElement("div");
      listElement.classList.add("list");
  
      let uncompletedTasksHTML = "";
      let completedTasksHTML = "";
      for (let j = 0; j < list.tasks.length; j++) {
        const task = list.tasks[j];
        const [year, month, day] = task.date.split("-");
        const formattedDate = `${day}/${month}/${year}`;
        const taskHTML = `
          <div class="task" style="opacity: ${task.completed ? 0.5 : 1};">
            <span class="task-name" ${task.completed ? 'style="text-decoration: line-through;"' : ''}>
              ${task.name} - ${formattedDate}
            </span>
            <div class="task-buttons">
              <button class="toggle-button" onclick="toggleTask(${i}, ${j})">${task.completed ? "✓" : "✕"}</button>
              <button class="edit-button" onclick="editTask(${i}, ${j})">✏️</button>
              <button class="delete-button" onclick="deleteTask(${i}, ${j})">🗑️</button>
            </div>
          </div>
        `;
  
        if (task.completed) {
          completedTasksHTML += taskHTML;
        } else {
          uncompletedTasksHTML += taskHTML;
        }
      }
  
      listElement.innerHTML = `
        <h3>${list.name} <button onclick="deleteList(${i})">Supprimer</button> <button onclick="exportCSV(${i})">CVS</button></h3>
        <div class="tasks">
          ${uncompletedTasksHTML}
        </div>
        ${completedTasksHTML ? '<h4>Tâches terminées</h4>' : ''}
        <div class="tasks completed-tasks">
          ${completedTasksHTML}
        </div>
        <button onclick="showTaskForm(${i})">Ajouter une tâche</button>
      `;
  
      listsContainer.appendChild(listElement);
    }
  };

  listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const listName = document.getElementById("list-name").value;
    lists.push({ name: listName, tasks: [] });
    listForm.reset();
    saveAndDisplay();
  });

  window.showTaskForm = (index) => {
    currentListId = index;
    taskForm.style.display = "block";
    editingTask = false;
  };

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = document.getElementById("task-name").value;
    const taskDate = document.getElementById("task-date").value;

    if (editingTask) {
      lists[currentListId].tasks[currentTaskId] = {
        name: taskName,
        date: taskDate,
        completed: lists[currentListId].tasks[currentTaskId].completed,
      };
      editingTask = false;
    } else {
      lists[currentListId].tasks.push({
        name: taskName,
        date: taskDate,
        completed: false,
      });
    }

    taskForm.reset();
    taskForm.style.display = "none";
    saveAndDisplay();
  });

  window.editTask = (listIndex, taskIndex) => {
    currentListId = listIndex;
    currentTaskId = taskIndex;
    editingTask = true;
    const task = lists[listIndex].tasks[taskIndex];
    document.getElementById("task-name").value = task.name;
    document.getElementById("task-date").value = task.date ;
    taskForm.style.display = "block";
  };

  window.deleteList = (index) => {
    lists.splice(index, 1);
    saveAndDisplay();
  };

  window.exportCSV = (index) => {
    const list = lists[index];
    const tasks = list.tasks;
  
    const taskData = tasks.map(task => ({
      Titre: task.name,
      Date: task.date,
      Terminé: task.completed ? "Oui" : "Non"
    }));
  
    const headers = Object.keys(taskData[0]).join(";");
    const rows = taskData.map(task =>
      `${task.Titre};${task.Date};${task.Terminé}`
    );

    let csvContent = "\uFEFF" + headers + "\n" + rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = `${list.name}.csv`;
    link.click();
  };
  
  
  window.deleteTask = (listIndex, taskIndex) => {
    lists[listIndex].tasks.splice(taskIndex, 1);
    saveAndDisplay();
  };

  window.toggleTask = (listIndex, taskIndex) => {
    const taskList = lists[listIndex].tasks;
    const task = taskList[taskIndex];
  
    task.completed = !task.completed;
  
    if (task.completed) {
      taskList.splice(taskIndex, 1);
      taskList.push(task);
    } else {
      const uncompletedTasks = taskList.filter(t => !t.completed);
      const completedTasks = taskList.filter(t => t.completed);
      lists[listIndex].tasks = [...uncompletedTasks, ...completedTasks];
    }
  
    saveAndDisplay();
  };

  const saveAndDisplay = () => {
    localStorage.setItem("lists", JSON.stringify(lists));
    displayLists();
  };

  displayLists();
});