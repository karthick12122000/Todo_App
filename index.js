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
//////////////////////----------------------
async function fetchTodos() {
  try {
    var response = await fetch("http://localhost:3000/todos", {});

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    var todos = await response.json();
    var Todo_list = document.querySelector(".todo__list");
    todos.forEach((n) => {
      var done = "";
      if (n.done == true) {
        var done = "Checked";
      }
      Todo_list.innerHTML +=
        '     <li class="list-group-item p-3"> <input type="checkbox" class="task" id="' +
        n._id +
        '" ' +
        done +
        '/><label for="' +
        n._id +
        '"> <span></span></label><span class="p-3">' +
        n.task +
        "</span> </li>";
    });
  } catch (err) {
    console.log(err);
  }
}
fetchTodos();
/////////////////--------------------------------
var Add = document.getElementById("enter");
Add.addEventListener("click", async () => {
  let value = document.querySelector("#taskinp");
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
    console.log(data);
    fetchTodos();
  } catch (err) {
    console.error("Error:", err);
  }
  value.value = "";
  Add.checked = false;
});
