/**
 * Creates an html element
 * @param {string} tag Html tag
 * @param {string | String[] | null} [classes]
 * @param {string | null} [text]
 * @param {object} [attributes] object containing attribute type as obj key and attribute value as obj value
 * @returns HTMLElement
 */
export const createHTML = (tag, classes, text, attributes) => {
  const elem = document.createElement(tag);
  if (classes) {
    if (Array.isArray(classes)) {
      elem.classList.add(...classes);
    } else {
      elem.classList.add(classes);
    }
  }

  if (text) {
    elem.innerText = text;
  }

  if (attributes) {
    const object = Object.entries(attributes);
    for (const [key, value] of object) {
      elem.setAttribute(key, value);
    }
  }

  return elem;
};
