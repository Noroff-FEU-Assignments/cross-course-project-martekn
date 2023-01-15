import { data as games } from "../../data/games.js";
import { createCard } from "../components/card.js";

export const setupGamesAll = () => {
  const gamesContainer = document.querySelector("#games-container");

  for (const game of games) {
    const card = createCard(game, false);
    gamesContainer.appendChild(card);
  }
};
