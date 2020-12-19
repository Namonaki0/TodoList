//? SELECTORS
const output = document.querySelector("#output");
const childN = output.childNodes;
const btn = document.querySelector(".btn");
const form = document.querySelector("form");
const counter = document.querySelector(".counter");
const filter = document.querySelector("#filter-todos");
const clearTasksBtn = document.querySelector(".remove-all");

//? EVENT LISTENERS
btn.addEventListener("click", addTodo);
output.addEventListener("click", markTodos);
filter.addEventListener("click", filterTodos);
clearTasksBtn.addEventListener("click", clearTasks);
window.addEventListener("DOMContentLoaded", showTodos);

//* FUNCTIONS

//? TASKS IMPLEMENTATION
function addTodo(e) {
  e.preventDefault();
  //? --TASK CREATION
  const inputValue = document.querySelector(".input").value;
  const li = document.createElement("li");
  li.innerHTML = inputValue;
  li.classList.add("styled");
  output.appendChild(li);

  //? --LOCAL STORAGE
  localStorageSave(inputValue);

  //? --REMOVE TASK BUTTON
  const close = document.createElement("button");
  close.innerHTML = "&times;";
  close.classList.add("closeBtn");
  li.appendChild(close);

  //? --COMPLETE TASK BUTTON
  const done = document.createElement("button");
  done.classList.add("doneBtn");
  done.innerHTML = "done";
  li.appendChild(done);
  counter.innerHTML = `Left to do: <span>${childN.length}</span>`;

  //? --CLEAR INPUT
  const input = document.querySelector(".input");
  input.value = "";
}

//? --MARK ITEMS IN LIST
function markTodos(e) {
  e.preventDefault();
  const item = e.target;
  if (item.classList[0] === "closeBtn") {
    const itemParent = item.parentElement;
    // const itemChildren = item.childNodes.innerText;
    itemParent.classList.add("fall");
    localStorageRemove(itemParent);
    itemParent.addEventListener("transitionend", () => {
      itemParent.remove();
      counter.innerHTML = `Left to do: <span>${childN.length}</span>`;
    });
  }
  if (item.classList[0] === "doneBtn") {
    const itemParent = item.parentElement;
    itemParent.classList.toggle("done");
  }
}

//? --FILTER ITEMS IN LIST
function filterTodos(e) {
  const todos = output.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "complete":
        if (todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//? --CLEAR ALL
function clearTasks(e) {
  e.preventDefault();
  const nodes = output.childNodes;
  if (output.childNodes.length > 0) {
    nodes.forEach((item) => {
      item.classList.add("fall");
      item.addEventListener("transitionend", () => {
        item.remove();
        localStorageRemove(item);
        counter.innerHTML = `Left to do: <span>${childN.length}</span>`;
      });
    });
  }
}

//? LOCAL STORAGE IMPLEMENTATION //

//? --SAVE TO LOCAL STORAGE
function localStorageSave(data) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(data);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//? --SHOW OUTSTANDING TASKS UI
function showTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    //? --TASK CREATION
    const inputValue = document.querySelector(".input").value;
    const li = document.createElement("li");
    li.innerHTML = todo;
    li.classList.add("styled");
    output.appendChild(li);

    //? --REMOVE TASK BUTTON
    const close = document.createElement("button");
    close.innerHTML = "&times;";
    close.classList.add("closeBtn");
    li.appendChild(close);

    //? --COMPLETE TASK BUTTON
    const done = document.createElement("button");
    done.classList.add("doneBtn");
    done.innerHTML = "done";
    li.appendChild(done);
    const childN = output.childNodes;
    counter.innerHTML = `Left to do: <span>${childN.length}</span>`;
  });
}

//? --REMOVE TASKS FROM LOCAL STORAGE
function localStorageRemove(data) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const dataContent = data.children[0].innerText;
  todos.splice(todos.indexOf(dataContent), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
