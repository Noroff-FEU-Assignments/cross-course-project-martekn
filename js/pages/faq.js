const buttons = document.querySelectorAll(".faq-item button");

export const setupFaq = () => {
  for (const button of buttons) {
    button.addEventListener("click", (e) => {
      const id = e.target.getAttribute("aria-controls");
      const answer = document.querySelector(`#${id}`);
      answer.classList.toggle("hide");
    });
  }
};
