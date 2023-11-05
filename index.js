//////////////////--------------------Mode
var ModeBtn = document.querySelector(".btn__mode");
var body = document.querySelector("body");

function Mode() {
  if (ModeBtn.dataset.dark == "true") {
    body.classList.remove("dark");
    ModeBtn.dataset.dark = "false";
    var isDarkModeEnabled = false;
    ModeBtn.querySelector("i").className = "bi bi-moon-fill";
  } else {
    body.classList.add("dark");
    ModeBtn.dataset.dark = "true";
    var isDarkModeEnabled = true;
    ModeBtn.querySelector("i").className = "bi bi-brightness-high-fill";
  }
  localStorage.setItem("dark-mode", isDarkModeEnabled);
}

ModeBtn.addEventListener("click", () => {
  Mode();
});

/////////////////-----------mode from local storage

if (localStorage.getItem("dark-mode") === "true") {
  body.classList.add("dark");
  ModeBtn.dataset.dark = "true";
  ModeBtn.querySelector("i").className = "bi bi-brightness-high-fill";
}
//////////////////////----------------------Get
async function fetchTodos() {
  try {
    var response = await fetch("http://localhost:3000/todos", {});

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    var todos = await response.json();
    var Todo_list = document.querySelector(".todo__list");
    Todo_list.innerHTML = "";
    var activeTask = 0;
    todos.forEach((n) => {
      var done = "";
      if (n.done == true) {
        var done = "Checked";
      } else {
        activeTask += 1;
      }
      Todo_list.innerHTML +=
        '     <li class="list-group-item position-relative todos" draggable="true" ondragstart="drag(event)"> <input type="checkbox" class="task " id="' +
        n._id +
        '" ' +
        done +
        ' onchange="taskStatus(this)"/><label for="' +
        n._id +
        '"> <span></span></label><span class="p-3">' +
        n.task +
        "</span> <button type='button' class='btn-close btn-close-white position-absolute' aria-label='Close' onclick='deleteRec(this)' data-id='" +
        n._id +
        "'></button></li>";
    });

    Todo_list.innerHTML +=
      '<li class="list-group-item d-flex"><p class="col-6 col-md-4  text-center">' +
      activeTask +
      ' items left</p> <div class="col-0 col-md-4 d-none d-md-flex gap-3 justify-content-center filter "><p class="active" onclick="filter(this)">All</p> <p onclick="filter(this)">Active</p> <p onclick="filter(this)">Completed</p></div> <p class="col-6 col-md-4 text-center clear" onclick="clearCompletedtask()">Clear Completed</p>  </li>';
  } catch (err) {
    console.log(err);
  }
}
fetchTodos();
/////////////////--------------------------------Post
var Add = document.getElementById("enter");
Add.addEventListener("change", async () => {
  let value = document.querySelector("#taskinp");
  if (value.value != null && value.value != "") {
    try {
      const response = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: value.value }),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();

      fetchTodos();
    } catch (err) {
      console.error("Error:", err);
    }
  }
  value.value = "";
  Add.checked = false;
});
/////////////////--------------------------------Update

var taskStatus = async function (e) {
  try {
    const response = await fetch("http://localhost:3000/todo/" + e.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: e.checked }),
    });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    fetchTodos();
  } catch (err) {
    console.error("Error:", err);
  }
};
//////////////------------------------delete
var clearCompletedtask = async function () {
  try {
    const response = await fetch("http://localhost:3000/todos/", {
      method: "Delete",
    });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    fetchTodos();
  } catch (err) {
    console.error("Error:", err);
  }
};
////////////////------------------------delete single record
var deleteRec = async function (e) {
  try {
    const response = await fetch(
      "http://localhost:3000/todo/" + e.getAttribute("data-id"),
      {
        method: "Delete",
      }
    );
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    fetchTodos();
  } catch (err) {
    console.error("Error:", err);
  }
};
////////----------------------drag and drop
var dragSrcEl = null;

var handleDragStart = function (e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
};

var handleDragOver = function (e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = "move";
  return false;
};

var handleDrop = function (e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
};

var drag = function (event) {
  var cols = document.querySelectorAll("#todoList li");
  cols.forEach((col) => {
    col.addEventListener("dragstart", handleDragStart, false);
    col.addEventListener("dragover", handleDragOver, false);
    col.addEventListener("drop", handleDrop, false);
  });
};
////////////////////-------------------filter
var filter = function (e) {
  var active = document.querySelector(".active");
  active.classList.remove("active");
  var cols = document.querySelectorAll("#todoList li");
  e.classList.add("active");
  cols.forEach((col) => {
    let checkedValue = col.querySelector("input[type='checkbox']");
    if (checkedValue != null) {
      if (e.innerText == "All") {
        col.style.display = "initial";
      } else if (e.innerText == "Active") {
        if (checkedValue.checked === true) {
          col.style.display = "none";
        } else {
          col.style.display = "initial";
        }
      } else if (e.innerText == "Completed") {
        if (checkedValue.checked === true) {
          col.style.display = "initial";
        } else {
          col.style.display = "none";
        }
      }
    }
  });
};
