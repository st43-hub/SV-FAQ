// 📜 FAQ 카드 아코디언 토글 스크립트

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".toggle-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".faq-card-js");
      const wrapper = card.querySelector(".faq-answer-js");
      const isOpen = wrapper.getAttribute("data-open") === "true";

      // 다른 카드 닫기
      document.querySelectorAll(".faq-card-js").forEach((otherCard) => {
        if (otherCard !== card) {
          const otherAnswer = otherCard.querySelector(".faq-answer-js");
          const otherBtn = otherCard.querySelector(".toggle-btn");
          if (otherAnswer.getAttribute("data-open") === "true") {
            otherAnswer.style.maxHeight = otherAnswer.scrollHeight + "px";
            requestAnimationFrame(() => {
              otherAnswer.style.maxHeight = "0px";
              otherAnswer.style.opacity = "0";
              otherAnswer.setAttribute("data-open", "false");
              otherBtn.classList.remove("open");
              otherCard.classList.remove("open");
            });
          }
        }
      });

      // 현재 카드 열고 닫기
      if (isOpen) {
        wrapper.style.maxHeight = wrapper.scrollHeight + "px";
        requestAnimationFrame(() => {
          wrapper.style.maxHeight = "0px";
          wrapper.style.opacity = "0";
          wrapper.setAttribute("data-open", "false");
        });
        btn.classList.remove("open");
        card.classList.remove("open");
      } else {
        wrapper.style.maxHeight = wrapper.scrollHeight + "px";
        wrapper.style.opacity = "1";
        wrapper.setAttribute("data-open", "true");
        btn.classList.add("open");
        card.classList.add("open");
      }
    });
  });
});
