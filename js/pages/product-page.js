import { fetchApiResults, parseGameRes } from "../util/api.js";
import { setupAddToCart } from "../features/cart.js";
import { createHTML } from "../util/createHTML.js";
import { setupImageSlider } from "../components/image-slider.js";

const button = document.querySelector("#btn-cart");
const id = new URLSearchParams(window.location.search).get("id");
const condition = new URLSearchParams(window.location.search).get("condition");
const minReq = document.querySelector("#min-req");
const recReq = document.querySelector("#rec-req");

const createPricing = (cPrice, oPrice) => {
  const priceContainer = document.querySelector("#price-container");
  if (cPrice === oPrice) {
    priceContainer.innerText = `$${oPrice}`;
  } else {
    const currentPriceContainer = createHTML("span", null, `$${cPrice}`);
    const originalPriceContainer = createHTML("s", null, `$${oPrice}`);
    priceContainer.append(currentPriceContainer, originalPriceContainer);
  }
};

const setConditions = (conditions) => {
  document.querySelector("#current-condition").innerHTML = condition;
  const conditionUl = document.querySelector("#condition-types");
  if (Object.keys(conditions).length <= 1) {
    conditionUl.remove();
  } else {
    for (const conditionType of Object.entries(conditions)) {
      const li = createHTML("li");
      const a = createHTML("a", null, conditionType[0], {
        href: `./product.html?id=${id}&condition=${conditionType[0]}`,
      });
      if (condition === conditionType[0]) {
        a.classList.add("active");
      }
      li.appendChild(a);
      conditionUl.appendChild(li);
    }
  }
};

const createMetaScore = (metascoreObj) => {
  if (metascoreObj) {
    document.querySelector("#meta-rating").innerHTML = metascoreObj.score;
    document.querySelector("#meta-date").innerHTML = `Updated ${metascoreObj.updated?.split("-").join(".")}`;
  } else {
    document.querySelector("#metascore-content").remove();
  }
};

const createDescription = (descriptions) => {
  const descriptionContainer = document.querySelector("#description");
  const paragraphs = descriptions.split("\n");
  for (let paragraph of paragraphs) {
    if (paragraph === "") {
      continue;
    }

    paragraph = paragraph.replace("<p>", "").replace("</p>", "");

    const p = createHTML("p", null, paragraph);
    descriptionContainer.appendChild(p);
  }
};

const createReqHTML = (title, value, parent) => {
  const div = createHTML("div", "grid");
  const dt = createHTML("dt", null, `${title}:`);
  const dd = createHTML("dd", null, value);
  div.append(dt, dd);
  parent.appendChild(div);
};
const createRequirements = (container, requirementsObj) => {
  if (requirementsObj) {
    if (requirementsObj.hasOwnProperty("os")) {
      createReqHTML("OS", requirementsObj.os, container);
    }
    if (requirementsObj.hasOwnProperty("processor")) {
      createReqHTML("Processor", requirementsObj.processor, container);
    }
    if (requirementsObj.hasOwnProperty("memory")) {
      createReqHTML("Memory", requirementsObj.memory, container);
    }
    if (requirementsObj.hasOwnProperty("graphics")) {
      createReqHTML("Graphics", requirementsObj.graphics, container);
    }
    if (requirementsObj.hasOwnProperty("directx")) {
      createReqHTML("DirectX", requirementsObj.directx, container);
    }
    if (requirementsObj.hasOwnProperty("storage")) {
      createReqHTML("Storage", requirementsObj.storage, container);
    }
  } else {
    const missingReq = createHTML("div", null, "Not specified");
    container.appendChild(missingReq);
  }
};

export const setupProductPage = async () => {
  const game = parseGameRes(await fetchApiResults(`/products/${id}`));
  const genre = [];
  let currentPrice = game.regular_price;
  let originalPrice = game.regular_price;

  for (const category of game.categories) {
    genre.push(category.name);
  }

  document.querySelector("#genre").innerHTML = genre.join(", ");
  document.querySelector("#release").innerHTML = game.meta_data.release_date.split("-").reverse().join(".");
  document.querySelector("#developer").innerHTML = game.meta_data.developer;
  document.querySelector("#title").innerHTML = game.name;

  if (condition === "preorder") {
    currentPrice = game.meta_data.conditions.preorder;
  }

  if (condition === "preowned") {
    currentPrice = game.meta_data.conditions.preowned;
  }

  if (condition === "new") {
    currentPrice = game.meta_data.conditions.new;
  }

  if (game.on_sale) {
    currentPrice = game.sale_price;
  }

  createPricing(currentPrice, originalPrice);
  setConditions(game.meta_data.conditions);
  createMetaScore(game.meta_data.meta_score);
  setupImageSlider(game);
  createDescription(game.description);
  createRequirements(minReq, game.meta_data.min_system_requirements);
  createRequirements(recReq, game.meta_data.recommended_system_requirements);

  setupAddToCart(button, game.id, game.name, game.images[0].src, currentPrice, originalPrice, condition);
};
