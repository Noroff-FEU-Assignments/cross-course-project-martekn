import { data as games } from "../../data/games.js";
import { createCard } from "../components/card.js";

export const setupGamesDeals = () => {
  const gamesContainer = document.querySelector("#games-container");
  const gamesOnSale = games.filter((game) => game.sale.onSale);

  for (const game of gamesOnSale) {
    const card = createCard(game, false);
    gamesContainer.appendChild(card);
  }
};
