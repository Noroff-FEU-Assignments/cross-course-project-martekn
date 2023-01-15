import { data as games } from "../../data/games.js";
import { createCard } from "../components/card.js";

export const setupLibrary = () => {
  const gamesContainer = document.querySelector("#games-container");
  const ownedGames = games.splice(0, 3);

  for (const game of ownedGames) {
    console.log(game);
    const card = createCard(game, true);
    gamesContainer.appendChild(card);
  }
};
