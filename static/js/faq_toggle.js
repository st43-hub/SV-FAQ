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

      // 다른 카드 닫기
      document.querySelectorAll(".faq-card-js").forEach((c) => {
        if (c !== card) {
          const a = c.querySelector(".faq-answer-js");
          const i = c.querySelector(".faq-toggle-icon");
          a.style.height = a.scrollHeight + "px";
          requestAnimationFrame(() => {
            a.style.transition = "height 0.3s ease";
            a.style.height = "0px";
            a.setAttribute("data-open", "false");
            if (i) i.textContent = "▶";
            c.classList.remove("open");
          });
        }
      });

      // 현재 카드 열기/닫기
      if (!isOpen) {
        answer.style.height = "0px";
        requestAnimationFrame(() => {
          answer.style.transition = "height 0.3s ease";
          answer.style.height = answer.scrollHeight + "px";
        });
        answer.setAttribute("data-open", "true");
        if (icon) icon.textContent = "▼";
        card.classList.add("open");

        // 펼친 후 height: auto 적용
        answer.addEventListener("transitionend", function handler() {
          if (answer.getAttribute("data-open") === "true") {
            answer.style.height = "auto";
          }
          answer.removeEventListener("transitionend", handler);
        });
      } else {
        answer.style.height = answer.scrollHeight + "px";
        requestAnimationFrame(() => {
          answer.style.transition = "height 0.3s ease";
          answer.style.height = "0px";
        });
        answer.setAttribute("data-open", "false");
        if (icon) icon.textContent = "▶";
        card.classList.remove("open");
      }
    });
  });
});