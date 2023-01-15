import { data as games } from "../../data/games.js";
import { createCard } from "../components/card.js";

export const setupIndex = () => {
  const latestGamesContainer = document.querySelector("#latest-games");
  const gamesOnSaleContainer = document.querySelector("#special-deals");
  const featuredGamesContainer = document.querySelector("#featured-games");

  for (const game of games) {
    game.parsedReleased = game.released.split("/").reverse().join("-");
  }

  const releasedGames = games.filter((game) => !game.preOrder);

  const latestGames = releasedGames
    .sort((a, b) => {
      return a.parsedReleased <= b.parsedReleased;
    })
    .splice(0, 4);

  const gamesOnSale = releasedGames
    .sort((a, b) => !a.sale.onSale)
    .sort((a, b) => a.sale.discount <= b.sale.discount)
    .splice(0, 4);

  for (const game of latestGames) {
    const card = createCard(game);
    latestGamesContainer.appendChild(card);
  }

  for (const game of gamesOnSale) {
    const card = createCard(game);
    gamesOnSaleContainer.appendChild(card);
  }

  const featuredGames = releasedGames.sort(() => Math.round(Math.random())).splice(0, 8);

  for (const game of featuredGames) {
    const card = createCard(game, false);
    featuredGamesContainer.appendChild(card);
  }
};
