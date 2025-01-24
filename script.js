// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Function to add a new task
  function addTask() {
    // Get and trim the input value
    const taskText = taskInput.value.trim();

    // Check if the task input is empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new list item (li) element
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    // Create a remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    // Add an event listener to the remove button
    removeButton.onclick = () => {
      taskList.removeChild(taskItem);
    };

    // Append the remove button to the list item
    taskItem.appendChild(removeButton);

    // Append the list item to the task list
    taskList.appendChild(taskItem);

    // Clear the input field
    taskInput.value = "";
  }

  // Add event listener to the "Add Task" button
  addButton.addEventListener("click", addTask);

  // Add event listener for pressing "Enter" in the input field
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});

// Function to remove a task from Local Storage
function removeTaskFromStorage(taskText) {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const updatedTasks = storedTasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Add event listener to the "Add Task" button
addButton.addEventListener("click", () => addTask(taskInput.value));

// Add event listener for pressing "Enter" in the input field
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask(taskInput.value);
  }
});

// Load existing tasks from Local Storage
loadTasks();
