const themeButton = document.querySelector("#theme-toggle");
/**
 * Toggles the theme
 * @param {HTMLElement} button or element with aria-pressed attribute
 * @param {"true" | "false"} themeState
 */
const toggleTheme = (button, themeState) => {
  const html = document.querySelector("html");
  button.setAttribute("aria-pressed", themeState);
  if (themeState) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
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

export const pageLoadTheme = () => {
  const themeState = JSON.parse(localStorage.getItem("theme"));
  if (themeState) {
    const html = document.querySelector("html");
    html.classList.add("dark");
  }
};

export const setupTheme = () => {
  getThemeFromLS(themeButton);
  themeButton.addEventListener("click", updateTheme);
};
