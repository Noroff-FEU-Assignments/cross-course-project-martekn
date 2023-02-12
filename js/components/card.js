import { createHTML } from "../util/createHTML.js";

export const createCard = (game, owned) => {
  let card;
  const imgContainer = createHTML("div", "image-container");
  imgContainer.style.backgroundImage = `url(${game.images[0].src})`;
  const image = createHTML("img", "rounded-corners", null, { src: game.images[0].src, alt: game.images[0].alt });

  imgContainer.appendChild(image);

  const content = createHTML("div", ["info", "flex", "flex--col"]);
  const title = createHTML("p", "h3", game.name);
  content.appendChild(title);

  if (owned) {
    card = createHTML("div", ["card", "card--owned", "bg-card", "rounded-corners", "shadow"]);
    const container = createHTML("div", ["cta-group", "flex"]);
    console.log(game);
    if (game.meta_data.conditions.hasOwnProperty("preorder")) {
      const release = createHTML(
        "span",
        ["preorder", "fg-low-contrast"],
        `Releases ${game.meta_data.release_date.split("-").reverse().join(".")} `
      );
      container.append(release);
    } else {
      const downloadBtn = createHTML("button", "btn", "Download");
      const sellBtn = createHTML("a", ["btn", "btn--accent"], "Sell", {
        href: `./sale-checkout.html?id=${game.id}`,
      });
      container.append(downloadBtn, sellBtn);
    }
    content.appendChild(container);
  } else {
    const pricingContainer = createHTML("div", ["pricing", "grid"]);
    const preownedGamesId = [];
    let gameCondition = "new";

    for (const [key, value] of Object.entries(game.meta_data.conditions)) {
      if (key === "preorder") {
        const releaseDate = game.meta_data.release_date.split("-").reverse().join(".");
        const release = createHTML("span", ["preorder", "fg-low-contrast"], releaseDate);
        pricingContainer.appendChild(release);
        gameCondition = key;
      }

      if (key === "preowned") {
        preownedGamesId.push(game.id);
        const discount = 100 - Math.round((Number(value) / game.regular_price) * 100);
        const discountContainer = createHTML("span", "discount", `-${discount}%`);

        const originalPrice = createHTML("s", "original-price", `$${game.regular_price}`);
        const currentPrice = createHTML("span", "current-price", `$${value}`);
        pricingContainer.append(discountContainer, originalPrice, currentPrice);
        gameCondition = key;
      }
    }

    if (game.on_sale) {
      const discount = 100 - Math.round((game.sale_price / game.regular_price) * 100);
      const discountContainer = createHTML("span", "discount", `-${discount}%`);

      const originalPrice = createHTML("s", "original-price", `$${game.regular_price}`);
      const currentPrice = createHTML("span", "current-price", `$${game.sale_price}`);
      pricingContainer.append(discountContainer, originalPrice, currentPrice);
    } else {
      if (!preownedGamesId.includes(game.id)) {
        const currentPrice = createHTML("span", "current-price", `$${game.regular_price}`);
        pricingContainer.appendChild(currentPrice);
      }
    }

    card = createHTML("a", ["card", "bg-card", "rounded-corners", "shadow"], null, {
      href: `./product.html?id=${game.id}&condition=${gameCondition}`,
    });

    content.append(pricingContainer);
  }

  card.append(imgContainer, content);

  return card;
};
