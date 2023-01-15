import { data as games } from "../../data/games.js";
import { createCard } from "../components/card.js";

export const setupGamesPreorder = () => {
  const gamesContainer = document.querySelector("#games-container");

  const preOrders = games.filter((game) => game.preOrder);

  for (const game of preOrders) {
    const card = createCard(game, false);
    gamesContainer.appendChild(card);
  }
};
