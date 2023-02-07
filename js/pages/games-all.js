import { fetchApiResults, parseGameRes } from "../util/api.js";
import { createBoxError } from "../components/error.js";
import { filterGames } from "../util/filter-games.js";

export const setupGamesAll = async () => {
  const gamesContainer = document.querySelector("#games-container");
  const main = document.querySelector("#main-content");
  const filter = document.querySelector("#filter");

  const parsedGames = [];
  try {
    const games = await fetchApiResults("/products", "?per_page=20");
    for (const game of games) {
      parsedGames.push(parseGameRes(game));
    }

    main.classList.remove("d-none");
    document.querySelector(".loader").classList.add("d-none");

    filterGames(parsedGames, gamesContainer);

    filter.addEventListener("change", () => {
      filterGames(parsedGames, gamesContainer);
    });
  } catch (error) {
    console.log(error);
    main.classList.add("d-none");
    document.querySelector(".loader").classList.add("d-none");

    const errorAlert = createBoxError(
      "There has been an error on our end, please refresh the page or try again later",
      "error"
    );

    main.parentNode.insertBefore(errorAlert, main.nextSibling);
  }
};
