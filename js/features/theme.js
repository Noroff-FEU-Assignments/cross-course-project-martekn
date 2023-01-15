const themeButton = document.querySelector("#theme-toggle");

/**
 * Toggles the theme
 * @param {HTMLElement} button or element with aria-pressed attribute
 * @param {*} themeState
 */
const toggleTheme = (button, themeState) => {
  const html = document.querySelector("html");
  button.setAttribute("aria-pressed", themeState);
  html.classList.toggle("dark");
};

const getThemeFromLS = () => {
  const themeState = JSON.parse(localStorage.getItem("theme"));

  if (themeState) {
    toggleTheme(themeButton, themeState);
  }
};

const updateTheme = () => {
  const currentState = themeButton.getAttribute("aria-pressed");
  const newState = currentState === "false";
  toggleTheme(themeButton, newState);

  localStorage.setItem("theme", JSON.stringify(newState));
};

export const setupTheme = () => {
  getThemeFromLS(themeButton);
  themeButton.addEventListener("click", updateTheme);
};
