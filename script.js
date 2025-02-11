const todoInput = document.getElementById("todo-input");
const todosWrapper = document.querySelector(".todos-wrapper");

const todosArray = JSON.parse(localStorage.getItem("todosArray")) || []; // [{title: "", isCompleted : false, id : }]

updateUi();

function handleAddTodo() {
  if (!todoInput.value) {
    alert("Add Valid input...");
    return;
  }

  const todoObj = {
    title: todoInput.value,
    isCompleted: false,
    id: Date.now(),
  };

  todosArray.push(todoObj);

  localStorage.setItem("todosArray", JSON.stringify(todosArray));

  // updating front end with latest todos
  updateUi();

  todoInput.value = "";
}

function updateUi() {
  todosWrapper.innerHTML = "";

  for (let i = 0; i < todosArray.length; i++) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    if (todosArray[i].isCompleted) {
      todoDiv.classList.add("completed-todo");
    }

    const todoPara = document.createElement("p");
    todoPara.innerText = todosArray[i].title;

    // delete to do button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", `deleteTodo(${todosArray[i].id})`);

    // mark as complete button
    const completeButton = document.createElement("button");
    completeButton.innerText = "Mark as complete";
    completeButton.setAttribute("onclick", `completeTodo(${todosArray[i].id})`);

    // appending paragraph to todo div
    todoDiv.appendChild(todoPara);
    todoDiv.appendChild(deleteButton);
    todoDiv.appendChild(completeButton);

    todosWrapper.append(todoDiv);
  }
}

function deleteTodo(id) {
  for (let i = 0; i < todosArray.length; i++) {
    if (todosArray[i].id === id) {
      todosArray.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("todosArray", JSON.stringify(todosArray));

  updateUi();
}

function completeTodo(id) {
  for (let i = 0; i < todosArray.length; i++) {
    if (todosArray[i].id === id) {
      todosArray[i].isCompleted = !todosArray[i].isCompleted;
    }
  }
  localStorage.setItem("todosArray", JSON.stringify(todosArray));

  updateUi();
}