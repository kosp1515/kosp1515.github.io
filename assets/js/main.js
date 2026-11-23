/* Shared scripts: mobile menu and footer year */
(function () {
  "use strict";

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Dark mode

  const root = document.documentElement;
  const themeBtn = document.querySelector(".theme-toggle");
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const isDark = () =>
    root.dataset.theme ? root.dataset.theme === "dark" : darkQuery.matches;

  function updateButton() {
    const label = isDark() ? "Switch to light mode" : "Switch to dark mode";
    themeBtn.setAttribute("aria-label", label);
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = isDark() ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      updateButton();
    });
    darkQuery.addEventListener("cahnge", updateButton);
    updateButton();
  }
})();
