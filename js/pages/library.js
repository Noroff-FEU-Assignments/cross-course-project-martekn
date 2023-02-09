import { createCard } from "../components/card.js";
import { fetchApiResults, parseGameRes } from "../util/api.js";
import { createBoxError } from "../components/error.js";

const gamesContainer = document.querySelector("#games-container");
const searchButton = document.querySelector("library-button");
const searchInput = document.querySelector("library-search");
export const setupLibrary = async () => {
  try {
    const game = await parseGameRes(await fetchApiResults(`/products/75`));
    document.querySelector(".loader").classList.add("d-none");

    let card = createCard(game, true);
    gamesContainer.appendChild(card);
  } catch (error) {
    document.querySelector(".loader").classList.add("d-none");

    const errorAlert = createBoxError(
      "There has been an error on our end, please refresh the page or try again later",
      "error"
    );

    gamesContainer.appendChild(errorAlert);
  }
};
