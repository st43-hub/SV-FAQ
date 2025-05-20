// 📜 FAQ 카드 아코디언 토글 스크립트 - scrollHeight 기반 애니메이션 최적화

window.addEventListener("DOMContentLoaded", () => {
  const summaries = document.querySelectorAll(".faq-summary-js");

  summaries.forEach((summary) => {
    summary.addEventListener("click", () => {
      const card = summary.closest(".faq-card-js");
      const answer = card.querySelector(".faq-answer-js");
      const icon = card.querySelector(".faq-toggle-icon");
      const isOpen = answer.getAttribute("data-open") === "true";

      // 모든 다른 카드 닫기
      document.querySelectorAll(".faq-card-js").forEach((c) => {
        if (c !== card) {
          const a = c.querySelector(".faq-answer-js");
          const i = c.querySelector(".faq-toggle-icon");

          a.style.transition = "height 0.3s ease, opacity 0.3s ease";
          a.style.height = a.scrollHeight + "px";
          requestAnimationFrame(() => {
            a.style.height = "0px";
            a.style.opacity = "0";
          });

          a.setAttribute("data-open", "false");
          if (i) i.textContent = "▶";
          c.classList.remove("open");
        }
      });

      if (!isOpen) {
        answer.style.transition = "height 0.3s ease, opacity 0.3s ease";
        answer.style.height = answer.scrollHeight + "px";
        answer.style.opacity = "1";
        answer.setAttribute("data-open", "true");
        if (icon) icon.textContent = "▼";

        // height 전환이 끝난 뒤 auto 적용
        answer.addEventListener("transitionend", function handler(e) {
          if (e.propertyName === "height") {
            answer.style.height = "auto";
            answer.removeEventListener("transitionend", handler);
          }
        });
      } else {
        // 접기
        answer.style.transition = "height 0.3s ease, opacity 0.3s ease";
        answer.style.height = answer.scrollHeight + "px"; // 먼저 현재 높이 설정
        requestAnimationFrame(() => {
          answer.style.height = "0px";
          answer.style.opacity = "0";
        });

        answer.setAttribute("data-open", "false");
        if (icon) icon.textContent = "▶";
      }
    });
  });
});
