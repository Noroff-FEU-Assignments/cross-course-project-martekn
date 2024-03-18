import { setupBanner } from "../components/banner.js";
import { createCard } from "../components/card.js";
import { fetchApiResults, parseGameRes } from "../util/api.js";
import { createBoxError } from "../components/error.js";

export const setupIndex = async () => {
  const latestGamesContainer = document.querySelector("#latest-games");
  const gamesOnSaleContainer = document.querySelector("#special-deals");
  const featuredGamesContainer = document.querySelector("#featured-games");
  const main = document.querySelector("#main-content");

  const parsedGames = [];
  try {
    const games = await fetchApiResults("/products", "?per_page=20");
    for (const game of games) {
      parsedGames.push(parseGameRes(game));
    }

    main.classList.remove("d-none");
    document.querySelector(".loader").classList.add("d-none");

    const featuredGame = parsedGames.find((game) => game.meta_data.is_banner_featured === "true");
    const monthlyDeal = parsedGames.find((game) => game.meta_data.is_monthly_deal === "true");

    setupBanner(featuredGame);
    setupBanner(monthlyDeal);

    const releasedGames = parsedGames.filter(
      (game) => game.meta_data.is_banner_featured === "false" && game.meta_data.is_monthly_deal === "false"
    );

    const latestGames = releasedGames
      .sort((a, b) => {
        return a.meta_data.release_date <= b.meta_data.release_date;
      })
      .splice(0, 4);

    const gamesOnSale = releasedGames
      .sort((a, b) => !a.on_sale)
      .sort((a, b) => a.regular_price - a.sale_price >= b.regular_price - b.sale_price)
      .splice(0, 4);

    const featuredGames = releasedGames.sort(() => Math.round(Math.random())).splice(0, 8);

    for (const game of latestGames) {
      const card = createCard(game);
      latestGamesContainer.appendChild(card);
    }

    for (const game of gamesOnSale) {
      const card = createCard(game);
      gamesOnSaleContainer.appendChild(card);
    }

    for (const game of featuredGames) {
      const card = createCard(game, false);
      featuredGamesContainer.appendChild(card);
    }
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
