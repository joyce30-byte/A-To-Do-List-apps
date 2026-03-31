const task = document.getElementById("task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskContainer = document.getElementById("tasks-container");

addTaskBtn.addEventListener("click", () => {
  if (task.value.trim() === "") return;

  
  const todoWrapper = document.createElement("div");
  const checkbox = document.createElement("input");
  const deleteButton = document.createElement("button");
  const taskText = document.createElement("p");

  
  todoWrapper.classList.add("todo-container");
  todoWrapper.draggable = true; // make draggable
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  deleteButton.classList.add("delete-button");
  taskText.classList.add("task-text");

  
  taskText.textContent = task.value;
  deleteButton.textContent = "Delete";

  
  todoWrapper.append(checkbox);
  todoWrapper.append(taskText);
  todoWrapper.append(deleteButton);
  taskContainer.append(todoWrapper);

  
  deleteButton.addEventListener("click", () => {
    todoWrapper.remove();
  });

  
  checkbox.addEventListener("change", () => {
    taskText.classList.toggle("completed", checkbox.checked);
  });

  // Drag & Drop functionality
  todoWrapper.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", null); // required for Firefox
    todoWrapper.classList.add("dragging");
  });

  todoWrapper.addEventListener("dragend", () => {
    todoWrapper.classList.remove("dragging");
  });

  taskContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(taskContainer, e.clientY);
    if (afterElement == null) {
      taskContainer.appendChild(dragging);
    } else {
      taskContainer.insertBefore(dragging, afterElement);
    }
  });

  task.value = "";
});


function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".todo-container:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}