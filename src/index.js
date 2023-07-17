let DISPLAY_FORM = false;

function showForm() {
  const form = document.getElementById("form");
  const sidebar = document.getElementById("sidebar");
  sidebar.style.opacity = 0;

  setTimeout(() => {
    sidebar.classList.add("hidden");
    form.classList.remove("hidden");
  }, 300);
}
