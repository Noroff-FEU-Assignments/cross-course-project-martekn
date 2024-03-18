import { createHTML } from "../util/createHTML.js";

export const setupBanner = (game) => {
  let parent;
  let content;
  if (game.meta_data.is_banner_featured === "true") {
    parent = document.querySelector("#preorder");
    content = createHTML("div", "flow-content");
    const title = createHTML("h2", ["text-bold", "text-700"], game.name);

    const date = new Date();
    const todaysDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let text;
    let button;
    const releaseDate = game.meta_data.release_date;
    if (todaysDate >= releaseDate) {
      text = createHTML("p", "text-450", `Is now available`);
      button = createHTML("a", ["btn", "btn--light-focus"], "View game");
    } else {
      text = createHTML("p", "text-450", `Coming ${releaseDate.split("-").reverse().join(".")}`);
      button = createHTML("a", ["btn", "btn--light-focus"], "Pre-order now", {
        href: `./product.html?id=${game.id}&condition=preorder`,
      });
    }
    content.append(title, text, button);
  }
  if (game.meta_data.is_monthly_deal === "true") {
    parent = document.querySelector("#monthly-deal");
    content = createHTML("div", "flex");
    const imageWrapper = createHTML("div", "image-wrapper");
    const image = createHTML("img", null, null, { src: game.images[0].src, alt: game.images[0].alt });
    imageWrapper.appendChild(image);
    const textContent = createHTML("div", ["content", "grid"]);
    const title = createHTML("h2", null, "This months deal");
    const subtitle = createHTML("span", ["subtitle", "h1"], game.name);

    const priceContainer = createHTML("div", ["price", "flex", "flex--col"]);
    const originalPriceContainer = createHTML("span");
    const originalPrice = createHTML("s", "original-price", `$${game.regular_price}`);
    originalPriceContainer.appendChild(originalPrice);
    const currentPrice = createHTML("span", "new-price", `$${game.sale_price}`);
    priceContainer.append(originalPriceContainer, currentPrice);

    const button = createHTML("a", ["btn", "btn--light-focus", "btn--arrow"], "View", {
      href: `./product.html?id=${game.id}&condition=new`,
    });

    textContent.append(title, subtitle, priceContainer, button);
    content.append(imageWrapper, textContent);
  }

  parent.style.backgroundImage = `url(${game.images[1].src})`;
  parent.appendChild(content);
};
