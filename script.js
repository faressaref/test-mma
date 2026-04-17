function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  const bottomNav = document.querySelector(".bottom-nav");

  menu.classList.toggle("active");

  if (bottomNav) {
    bottomNav.style.display =
      menu.classList.contains("active") ? "none" : "flex";
  }
}
document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("sideMenu");
    const bottomNav = document.querySelector(".bottom-nav");

    menu.classList.remove("active");

    if (bottomNav) {
      bottomNav.style.display = "flex";
    }
  });
});
// قفل المينيو لما تدوس برا
document.addEventListener("click", function (e) {
  const menu = document.getElementById("sideMenu");
  const menuIcon = document.querySelector(".menu-icon");
  const bottomNav = document.querySelector(".bottom-nav");

  if (menu.classList.contains("active")) {

    if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
      menu.classList.remove("active");

      if (bottomNav) {
        bottomNav.style.display = "flex";
      }
    }

  }
});