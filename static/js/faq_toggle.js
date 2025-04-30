// 📜 FAQ 카드 아코디언 토글 스크립트

// DOM이 완전히 로드된 후 실행
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".faq-summary-js");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".faq-card-js"); // 카드 컨테이너
      const wrapper = card.querySelector(".faq-answer-js"); // 답변 영역
      const icon = card.querySelector(".faq-toggle-icon"); // 아이콘
      const isOpen = wrapper.getAttribute("data-open") === "true";

      // 다른 카드 닫기
      document.querySelectorAll(".faq-card-js").forEach((otherCard) => {
        if (otherCard !== card) {
          const otherAnswer = otherCard.querySelector(".faq-answer-js");
          const otherBtn = otherCard.querySelector(".faq-summary-js");
          const otherIcon = otherCard.querySelector(".faq-toggle-icon");
          if (otherAnswer.getAttribute("data-open") === "true") {
            otherAnswer.style.maxHeight = otherAnswer.scrollHeight + "px";
            requestAnimationFrame(() => {
              otherAnswer.style.maxHeight = "0px";
              otherAnswer.setAttribute("data-open", "false");
              otherBtn.classList.remove("open");
              otherCard.classList.remove("open");
              if (otherIcon) otherIcon.textContent = "▶";
            });
          }
        }
      });

      // 현재 카드 열고 닫기
      if (isOpen) {
        wrapper.style.maxHeight = wrapper.scrollHeight + "px";
        requestAnimationFrame(() => {
          wrapper.style.maxHeight = "0px";
          wrapper.setAttribute("data-open", "false");
        });
        btn.classList.remove("open");
        card.classList.remove("open");
        if (icon) icon.textContent = "▶";
      } else {
        wrapper.style.maxHeight = "0px";
        wrapper.setAttribute("data-open", "true");
        btn.classList.add("open");
        card.classList.add("open");
        requestAnimationFrame(() => {
          wrapper.style.maxHeight = wrapper.scrollHeight + "px";
        });

        // transition이 끝나면 max-height 무제한 설정
        wrapper.addEventListener("transitionend", function handler() {
          if (wrapper.getAttribute("data-open") === "true") {
            wrapper.style.maxHeight = "none";
          }
          wrapper.removeEventListener("transitionend", handler);
        });

        if (icon) icon.textContent = "▼";
      }
    });
  });
});