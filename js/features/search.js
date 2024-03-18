const button = document.querySelector("#search-btn");
const input = document.querySelector("#search-input");

const searchGame = (searchTerm) => {
  location.href = `./games-all.html?search=${searchTerm}`;
};

export const setupGameSearch = () => {
  if (button) {
    button.addEventListener("click", (e) => {
      searchGame(input.value);
    });
    input.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        searchGame(input.value);
      }
    });
  }
};
