// 📜 FAQ 카드 아코디언 토글 스크립트

document.addEventListener("DOMContentLoaded", function () {
  const summaries = document.querySelectorAll(".faq-summary-js");

  summaries.forEach((summary) => {
    summary.addEventListener("click", () => {
      const card = summary.closest(".faq-card-js");
      const wrapper = card.querySelector(".faq-answer-js");
      const icon = card.querySelector(".faq-toggle-icon");
      const isOpen = wrapper.getAttribute("data-open") === "true";

      // 다른 카드 닫기
      document.querySelectorAll(".faq-card-js").forEach((c) => {
        if (c !== card) {
          const otherWrapper = c.querySelector(".faq-answer-js");
          const otherIcon = c.querySelector(".faq-toggle-icon");
          if (otherWrapper.getAttribute("data-open") === "true") {
            otherWrapper.style.maxHeight = "0px";
            otherWrapper.setAttribute("data-open", "false");
            otherIcon.textContent = "▶";
          }
        }
      });

      if (isOpen) {
        wrapper.style.maxHeight = "0px";
        wrapper.setAttribute("data-open", "false");
        icon.textContent = "▶";
      } else {
        wrapper.style.maxHeight = wrapper.scrollHeight + "px";
        wrapper.setAttribute("data-open", "true");
        icon.textContent = "▼";

        wrapper.addEventListener("transitionend", function handler() {
          if (wrapper.getAttribute("data-open") === "true") {
            wrapper.style.maxHeight = "none";
          }
          wrapper.removeEventListener("transitionend", handler);
        });
      }
    });
  });
});