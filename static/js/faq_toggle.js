// 📜 FAQ 카드 아코디언 토글 스크립트 (개선 버전)
document.addEventListener("DOMContentLoaded", function () {
  const summaries = document.querySelectorAll(".faq-summary-js");

  summaries.forEach((summary) => {
    summary.addEventListener("click", () => {
      const card = summary.closest(".faq-card-js");
      const wrapper = card.querySelector(".faq-answer-js");
      const icon = card.querySelector(".faq-toggle-icon");
      const isOpen = wrapper.getAttribute("data-open") === "true";

      // 모든 카드 닫기 (다중 열림 방지)
      document.querySelectorAll(".faq-card-js").forEach((c) => {
        const otherWrapper = c.querySelector(".faq-answer-js");
        const otherIcon = c.querySelector(".faq-toggle-icon");
        if (c !== card && otherWrapper.getAttribute("data-open") === "true") {
          otherWrapper.style.maxHeight = "0px";
          otherWrapper.setAttribute("data-open", "false");
          otherIcon.textContent = "▶";
        }
      });

      // 현재 카드 열고 닫기
      if (isOpen) {
        wrapper.style.maxHeight = "0px";
        wrapper.setAttribute("data-open", "false");
        icon.textContent = "▶";
      } else {
        wrapper.style.maxHeight = wrapper.scrollHeight + "px";
        wrapper.setAttribute("data-open", "true");
        icon.textContent = "▼";

        // transition 끝난 후 max-height 무제한
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
