import { createHTML } from "../util/createHTML.js";

export const createCard = (game, owned) => {
  let card;
  const imgContainer = createHTML("div", "image-container");
  imgContainer.style.backgroundImage = `url(${game.imageUrl})`;
  const image = createHTML("img", "rounded-corners", null, { src: game.imageUrl, alt: game.imageAlt });
  imgContainer.appendChild(image);

  const content = createHTML("div", ["info", "flex", "flex--col"]);
  const title = createHTML("p", "h3", game.name);
  content.appendChild(title);

  if (owned) {
    card = createHTML("div", ["card", "card--owned", "bg-card", "rounded-corners", "shadow"]);
    const btnContainer = createHTML("div", ["cta-group", "flex"]);
    const downloadBtn = createHTML("button", "btn", "Download");
    const sellBtn = createHTML("a", ["btn", "btn--accent"], "Sell", { href: "./sale-checkout.html" });
    btnContainer.append(downloadBtn, sellBtn);
    content.appendChild(btnContainer);
  } else {
    card = createHTML("a", ["card", "bg-card", "rounded-corners", "shadow"], null, { href: "./product.html" });
    const pricingContainer = createHTML("div", ["pricing", "grid"]);

    if (game.preOrder) {
      const release = createHTML("span", ["preorder", "fg-low-contrast"], game.released);
      pricingContainer.appendChild(release);
    }

    if (game.sale.onSale) {
      const discount = createHTML("span", "discount", `-${game.sale.discount}%`);

      const originalPrice = createHTML("s", "original-price", `$${game.price}`);
      const currentPrice = createHTML("span", "current-price", `$${game.sale.discountedPrice}`);
      pricingContainer.append(discount, originalPrice, currentPrice);
    } else {
      const currentPrice = createHTML("span", "current-price", `$${game.price}`);
      pricingContainer.appendChild(currentPrice);
    }

    content.append(pricingContainer);
  }

  card.append(imgContainer, content);

  return card;
};
