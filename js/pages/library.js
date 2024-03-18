import { createCard } from "../components/card.js";
import { fetchApiResults, parseGameRes } from "../util/api.js";
import { createBoxError } from "../components/error.js";
const user = JSON.parse(localStorage.getItem("user"));

const gamesContainer = document.querySelector("#games-container");
const searchButton = document.querySelector("#library-button");
const searchInput = document.querySelector("#library-input");
const ownedGamesId = user.ownedGames.map((game) => game.id);

const searchLibrary = (ownedGames) => {
  gamesContainer.innerHTML = "";
  const searchedGames = ownedGames.filter((game) => game.name.toLowerCase().startsWith(searchInput.value));
  searchInput.value = "";
  for (const game of searchedGames) {
    let card = createCard(game, true);
    gamesContainer.appendChild(card);
  }

  if (searchedGames.length === 0) {
    const error = createBoxError("No games found matching your search", "error");
    gamesContainer.appendChild(error);
  }
};

export const setupLibrary = async () => {
  try {
    if (ownedGamesId.length === 0) {
      document.querySelector("#library-search").remove();
      const error = createBoxError("You dont own any games yet", "error");
      gamesContainer.appendChild(error);
    } else {
      const games = await fetchApiResults("/products", "?per_page=20");
      const parsedGames = games.map((game) => parseGameRes(game));

      const ownedGames = parsedGames.filter((game) => ownedGamesId.includes(game.id));

      for (const game of ownedGames) {
        let card = createCard(game, true);
        gamesContainer.appendChild(card);
      }

      searchButton.addEventListener("click", (e) => {
        searchLibrary(ownedGames);
      });

      searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          searchLibrary(ownedGames);
        }
      });
    }
    document.querySelector(".loader").classList.add("d-none");
  } catch (error) {
    console.log(error);
    document.querySelector(".loader").classList.add("d-none");

    const errorAlert = createBoxError(
      "There has been an error on our end, please refresh the page or try again later",
      "error"
    );

    gamesContainer.appendChild(errorAlert);
  }
};
