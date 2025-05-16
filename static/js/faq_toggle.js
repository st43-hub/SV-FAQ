// 📜 FAQ 카드 아코디언 토글 스크립트 (Labelit 스타일 리디자인 반영)

window.addEventListener("DOMContentLoaded", () => {
  const summaries = document.querySelectorAll(".faq-summary-js");

  summaries.forEach((summary) => {
    summary.addEventListener("click", () => {
      const card = summary.closest(".faq-card-js");
      const answer = card.querySelector(".faq-answer-js");
      const icon = card.querySelector(".faq-toggle-icon");
      const isOpen = answer.getAttribute("data-open") === "true";

      // 다른 카드 닫기 처리
      document.querySelectorAll(".faq-card-js").forEach((c) => {
        if (c !== card) {
          const a = c.querySelector(".faq-answer-js");
          const i = c.querySelector(".faq-toggle-icon");
          a.style.transition = "opacity 0.15s ease, height 0.25s ease";
          a.style.opacity = "0";
          requestAnimationFrame(() => {
            a.style.height = "0px";
            a.setAttribute("data-open", "false");
            if (i) i.textContent = "▶";
            c.classList.remove("open");
            c.style.backgroundColor = "";
            c.style.boxShadow = "";
            c.style.borderColor = "";
          });
        }
      });

      if (!isOpen) {
        // 펼치기: opacity + height 동시 적용
        answer.style.height = "0px";
        answer.style.opacity = "0";
        requestAnimationFrame(() => {
          answer.style.transition = "opacity 0.15s ease, height 0.25s ease";
          answer.style.height = answer.scrollHeight + "px";
          answer.style.opacity = "1";
        });

        answer.setAttribute("data-open", "true");
        if (icon) icon.textContent = "▼";
        card.classList.add("open");

        // ✅ 열린 카드에 Labelit 스타일 적용
        card.style.backgroundColor = "#27272a"; // 어두운 회색 배경
        card.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.6)";
        card.style.borderColor = "#3f3f46";

        answer.addEventListener("transitionend", function handler(e) {
          if (e.propertyName === "height" && answer.getAttribute("data-open") === "true") {
            answer.style.height = "auto";
          }
          answer.removeEventListener("transitionend", handler);
        });
      } else {
        // 접기: opacity 먼저 → height
        answer.style.transition = "opacity 0.15s ease, height 0.25s ease";
        answer.style.opacity = "0";
        requestAnimationFrame(() => {
          answer.style.height = "0px";
        });

        answer.setAttribute("data-open", "false");
        if (icon) icon.textContent = "▶";
        card.classList.remove("open");

        // ✅ 닫힐 때 스타일 초기화
        card.style.backgroundColor = "";
        card.style.boxShadow = "";
        card.style.borderColor = "";
      }
    });
  });
});
