import { createCard } from "../components/card.js";
import { fetchApiResults, parseGameRes } from "../util/api.js";
import { createBoxError } from "../components/error.js";
const user = JSON.parse(localStorage.getItem("user"));

const gamesContainer = document.querySelector("#games-container");
const searchButton = document.querySelector("#library-button");
const searchInput = document.querySelector("#library-input");
const ownedGamesId = [];
const ownedGames = [];
const parsedGames = [];

for (const game of user.ownedGames) {
  ownedGamesId.push(game.id);
}

const searchLibrary = () => {
  gamesContainer.innerHTML = "";
  const searchedGames = ownedGames.filter((game) => game.name.toLowerCase().startsWith(searchInput.value));
  searchInput.value = "";
  for (const game of searchedGames) {
    let card = createCard(game, true);
    gamesContainer.appendChild(card);
  }
  console.log(searchedGames);
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
      for (const game of games) {
        parsedGames.push(parseGameRes(game));
      }

      for (const game of parsedGames) {
        for (const id of ownedGamesId) {
          if (game.id === id) {
            ownedGames.push(game);
          }
        }
      }

      for (const game of ownedGames) {
        let card = createCard(game, true);
        gamesContainer.appendChild(card);
      }

      searchButton.addEventListener("click", (e) => {
        searchLibrary();
      });

      searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          searchLibrary();
        }
      });
    }
    document.querySelector(".loader").classList.add("d-none");
  } catch (error) {
    document.querySelector(".loader").classList.add("d-none");

    const errorAlert = createBoxError(
      "There has been an error on our end, please refresh the page or try again later",
      "error"
    );

    gamesContainer.appendChild(errorAlert);
  }
};
