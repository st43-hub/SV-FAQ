// 📜 FAQ 카드 아코디언 토글 스크립트

// DOM 완전 로딩 후 실행
window.addEventListener("DOMContentLoaded", () => {
  const summaries = document.querySelectorAll(".faq-summary-js");

  summaries.forEach((summary) => {
    summary.addEventListener("click", () => {
      const card = summary.closest(".faq-card-js");
      const answer = card.querySelector(".faq-answer-js");
      const icon = card.querySelector(".faq-toggle-icon");
      const isOpen = answer.getAttribute("data-open") === "true";

      // 모든 카드 닫기
      document.querySelectorAll(".faq-card-js").forEach((c) => {
        if (c !== card) {
          const otherAnswer = c.querySelector(".faq-answer-js");
          const otherIcon = c.querySelector(".faq-toggle-icon");
          if (otherAnswer.getAttribute("data-open") === "true") {
            otherAnswer.style.maxHeight = "0px";
            otherAnswer.setAttribute("data-open", "false");
            if (otherIcon) otherIcon.textContent = "▶";
            c.classList.remove("open");
          }
        }
      });

      // 현재 카드 토글
      if (isOpen) {
        answer.style.maxHeight = "0px";
        answer.setAttribute("data-open", "false");
        if (icon) icon.textContent = "▶";
        card.classList.remove("open");
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.setAttribute("data-open", "true");
        if (icon) icon.textContent = "▼";
        card.classList.add("open");

        // max-height 해제 (접힘 방지)
        answer.addEventListener("transitionend", function handler() {
          if (answer.getAttribute("data-open") === "true") {
            answer.style.maxHeight = "none";
          }
          answer.removeEventListener("transitionend", handler);
        });
      }
    });
  });
});
