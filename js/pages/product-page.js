import { setupAddToCart } from "../features/cart.js";
import { createHTML } from "../util/createHTML.js";
const button = document.querySelector("#btn-cart");
const images = Array.from(document.querySelectorAll(".slider li"));
const imageContainer = document.querySelector("#image-container");
const slider = document.querySelector(".slider");
const sliderButtonRight = document.querySelector(".slider-button--right");
const sliderButtonLeft = document.querySelector(".slider-button--left");

const toggleSliderButtons = (index) => {
  if (index >= 1) {
    sliderButtonLeft.classList.remove("hide");
  }
  if (index === images.length - 1) {
    sliderButtonRight.classList.add("hide");
  }

  if (index === 0) {
    sliderButtonLeft.classList.add("hide");
  }

  if (index <= images.length - 2) {
    sliderButtonRight.classList.remove("hide");
  }
};

const displayNewImage = (imageLi) => {
  const imageUrl = imageLi.children[0].getAttribute("src");
  const imageAlt = imageLi.children[0].getAttribute("alt");
  const activeImages = Array.from(slider.querySelectorAll(".active"));

  for (const activeImage of activeImages) {
    activeImage.classList.remove("active");
  }

  imageLi.classList.add("active");

  if (imageContainer.children[0]) {
    imageContainer.children[0].remove();
  }
  if (imageLi.getAttribute("data-image") === "cover") {
    const coverContainer = createHTML("div", ["cover", "flex"]);
    const image = createHTML("img", null, null, { src: imageUrl, alt: imageAlt });
    coverContainer.appendChild(image);
    imageContainer.appendChild(coverContainer);
  } else {
    const image = createHTML("img", null, null, { src: imageUrl, alt: imageAlt });
    imageContainer.appendChild(image);
  }
};

const updateSlider = (imageLi, index) => {
  const padding = (slider.scrollWidth - images.length * imageLi.clientWidth) / images.length;
  const imageWidth = imageLi.clientWidth + padding;
  const sliderWidth = slider.clientWidth;

  slider.scrollLeft = Math.round(index * imageWidth - sliderWidth / 2 + imageWidth / 2);

  displayNewImage(imageLi);
  toggleSliderButtons(index);
};

updateSlider(images[0], 0);

sliderButtonRight.addEventListener("click", (e) => {
  let currentImageIndex = images.findIndex((image) => image.classList.contains("active") === true);
  if (currentImageIndex <= 0) {
    currentImageIndex = 0;
  }
  const newIndex = currentImageIndex + 1;

  updateSlider(images[newIndex], newIndex);
});

sliderButtonLeft.addEventListener("click", (e) => {
  let currentImageIndex = images.findIndex((image) => image.classList.contains("active") === true);
  if (currentImageIndex <= 0) {
    currentImageIndex = 0;
  }
  const newIndex = currentImageIndex - 1;
  updateSlider(images[newIndex], newIndex);
});

for (let [i, image] of images.entries()) {
  image.addEventListener("click", function (e) {
    updateSlider(this, i);
  });
}

export const setupProductPage = () => {
  setupAddToCart(button, 13, "Ori and the Will of the Wisps", "/assets/covers/image13.jpg", 29.99, 23.99, "new");
};
