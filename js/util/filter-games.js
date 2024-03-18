import { createCard } from "../components/card.js";

export const filterGames = (games, parent) => {
  parent.innerHTML = "";

  if (filter.value === "popularity") {
    games.sort((a, b) => a.total_sales <= b.total_sales);
  }

  if (filter.value === "price") {
    for (const game of games) {
      let price = game.regular_price;
      if (game.on_sale) {
        price = game.sale_price;
      }
      for (const [key, value] of Object.entries(game.meta_data.conditions)) {
        if (key === "preowned") {
          price = value;
        }
        if (key === "preorder") {
          price = value;
        }
      }
      game.currentPrice = Number(price);
    }

    games.sort((a, b) => a.currentPrice >= b.currentPrice);
  }

  if (filter.value === "name") {
    games.sort((a, b) => a.name.toLowerCase() >= b.name.toLowerCase());
  }
  if (filter.value === "latest") {
    games.sort((a, b) => {
      return a.meta_data.release_date <= b.meta_data.release_date;
    });
  }

  for (const game of games) {
    const card = createCard(game, false);
    parent.appendChild(card);
  }
};
