import { createCard } from "../components/card.js";
import { fetchApiResults, parseGameRes } from "../util/api.js";
import { createBoxError } from "../components/error.js";

const gamesContainer = document.querySelector("#games-container");

export const setupLibrary = async () => {
  try {
    const games = await fetchApiResults("/products", "?per_page=20");
    document.querySelector(".loader").classList.add("d-none");
    const parsedGames = [];
    for (const game of games) {
      parsedGames.push(parseGameRes(game));
    }

    const ownedGames = parsedGames.splice(0, 3);

    for (const game of ownedGames) {
      console.log(game);
      const card = createCard(game, true);
      gamesContainer.appendChild(card);
    }
  } catch (error) {
    document.querySelector(".loader").classList.add("d-none");

    const errorAlert = createBoxError(
      "There has been an error on our end, please refresh the page or try again later",
      "error"
    );

    gamesContainer.appendChild(errorAlert);
  }
};
