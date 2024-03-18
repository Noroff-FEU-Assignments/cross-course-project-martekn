import { createHTML } from "../util/createHTML.js";

const slider = document.querySelector("#slider");
const sliderButtonRight = document.querySelector(".slider-button--right");
const sliderButtonLeft = document.querySelector(".slider-button--left");
const imageContainer = document.querySelector("#image-container");

const createImages = (images) => {
  for (const [i, image] of images.entries()) {
    const li = createHTML("li");
    if (i === 0) {
      li.setAttribute("data-image", "cover");
    }
    const img = createHTML("img", null, null, { src: image.src, alt: image.alt });
    li.appendChild(img);
    slider.appendChild(li);
  }
};

const toggleSliderButtons = (index, images) => {
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

const displayNewImage = (imageElement) => {
  const imageUrl = imageElement.children[0].getAttribute("src");
  const imageAlt = imageElement.children[0].getAttribute("alt");
  const activeImages = Array.from(slider.querySelectorAll(".active"));

  for (const activeImage of activeImages) {
    activeImage.classList.remove("active");
  }

  imageElement.classList.add("active");

  if (imageContainer.children[0]) {
    imageContainer.children[0].remove();
  }
  if (imageElement.getAttribute("data-image") === "cover") {
    const coverContainer = createHTML("div", ["cover", "flex"]);
    const image = createHTML("img", null, null, { src: imageUrl, alt: imageAlt });
    coverContainer.appendChild(image);
    imageContainer.appendChild(coverContainer);
  } else {
    const image = createHTML("img", null, null, { src: imageUrl, alt: imageAlt });
    imageContainer.appendChild(image);
  }
};

const updateSlider = (imageElement, index, images) => {
  const padding = (slider.scrollWidth - images.length * imageElement.clientWidth) / images.length;
  const imageWidth = imageElement.clientWidth + padding;
  const sliderWidth = slider.clientWidth;

  slider.scrollLeft = Math.round(index * imageWidth - sliderWidth / 2 + imageWidth / 2);

  displayNewImage(imageElement);
  toggleSliderButtons(index, images);
};

export const setupImageSlider = (game) => {
  createImages(game.images, slider);
  const images = Array.from(document.querySelectorAll("#slider li"));

  updateSlider(images[0], 0, images);

  sliderButtonRight.addEventListener("click", (e) => {
    let currentImageIndex = images.findIndex((image) => image.classList.contains("active") === true);
    if (currentImageIndex <= 0) {
      currentImageIndex = 0;
    }
    const newIndex = currentImageIndex + 1;

    updateSlider(images[newIndex], newIndex, images);
  });

  sliderButtonLeft.addEventListener("click", (e) => {
    let currentImageIndex = images.findIndex((image) => image.classList.contains("active") === true);
    if (currentImageIndex <= 0) {
      currentImageIndex = 0;
    }
    const newIndex = currentImageIndex - 1;
    updateSlider(images[newIndex], newIndex, images);
  });

  for (let [i, image] of images.entries()) {
    image.addEventListener("click", function (e) {
      updateSlider(this, i, images);
    });
  }
};
