// 📜 FAQ 카드 아코디언 토글 스크립트 - scrollHeight 기반 애니메이션 복구

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
          const otherAnswer = c.querySelector(".faq-answer-js");
          const otherIcon = c.querySelector(".faq-toggle-icon");
          if (otherAnswer.getAttribute("data-open") === "true") {
            otherAnswer.style.height = otherAnswer.scrollHeight + "px";
            requestAnimationFrame(() => {
              otherAnswer.style.transition = "height 0.3s ease";
              otherAnswer.style.height = "0px";
              otherAnswer.setAttribute("data-open", "false");
              setTimeout(() => {
                otherAnswer.style.display = "none";
              }, 300);
            });
            if (otherIcon) otherIcon.textContent = "▶";
            c.classList.remove("open");
          }
        }
      });

      // 현재 카드 토글
      if (isOpen) {
        answer.style.height = answer.scrollHeight + "px";
        requestAnimationFrame(() => {
          answer.style.transition = "height 0.3s ease";
          answer.style.height = "0px";
        });
        setTimeout(() => {
          answer.style.display = "none";
          answer.setAttribute("data-open", "false");
        }, 300);
        if (icon) icon.textContent = "▶";
        card.classList.remove("open");
      } else {
        answer.style.display = "block";
        const height = answer.scrollHeight + "px";
        answer.style.height = "0px";
        requestAnimationFrame(() => {
          answer.style.transition = "height 0.3s ease";
          answer.style.height = height;
          answer.setAttribute("data-open", "true");
        });
        if (icon) icon.textContent = "▼";
        card.classList.add("open");
      }
    });
  });
});
