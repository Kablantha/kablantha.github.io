/* Tabs */
document.querySelectorAll(".tabs").forEach(tabsContainer => {
  const tabs = tabsContainer.querySelectorAll(".tab");
  const panels = tabsContainer.querySelectorAll(".tab-panel");

  function activate(tab) {
    const targetId = tab.getAttribute("aria-controls");

    tabs.forEach(t => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });

    panels.forEach(p => {
      p.classList.remove("active");
      p.setAttribute("aria-hidden", "true");
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    const panel = tabsContainer.querySelector(`#${targetId}`);
    if (panel) {
      panel.classList.add("active");
      panel.setAttribute("aria-hidden", "false");
    }
  }

  tabs.forEach(tab =>
    tab.addEventListener("click", () => activate(tab))
  );

  activate(tabs[0]);
});


/* Dark Mode */
const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;
const stateText = toggle.querySelector(".toggle-state");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  const isDark = theme === "dark";

  toggle.setAttribute("aria-checked", String(isDark));
  stateText.textContent = isDark ? "On" : "Off";

  localStorage.setItem("theme", theme);
}

/* Initialize */
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  applyTheme(savedTheme);
} else if (systemPrefersDark) {
  applyTheme("dark");
} else {
  applyTheme("light");
}

/* Toggle interaction */
toggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  applyTheme(isDark ? "light" : "dark");
});