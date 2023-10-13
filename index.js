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
