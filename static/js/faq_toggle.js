// 📜 FAQ 카드 아코디언 토글 스크립트 (scrollHeight 기반 애니메이션 + 아이콘 회전 개선)

window.addEventListener("DOMContentLoaded", () => {
  const summaries = document.querySelectorAll(".faq-summary-js");

  summaries.forEach((summary) => {
    summary.addEventListener("click", () => {
      const card = summary.closest(".faq-card-js");
      const answer = card.querySelector(".faq-answer-js");
      const icon = card.querySelector(".faq-toggle-icon");
      const isOpen = answer.getAttribute("data-open") === "true";

      // ✅ 모든 카드 닫기 처리
      document.querySelectorAll(".faq-card-js").forEach((c) => {
        const a = c.querySelector(".faq-answer-js");
        const i = c.querySelector(".faq-toggle-icon");
        if (a.getAttribute("data-open") === "true") {
          a.style.height = a.scrollHeight + "px"; // 현재 높이 설정 후
          requestAnimationFrame(() => {
            a.style.transition = "height 0.3s ease, opacity 0.3s ease";
            a.style.height = "0px";
            a.style.opacity = "0";
            a.setAttribute("data-open", "false");
          });
          c.classList.remove("open"); // 회전 제거
        }
      });

      // ✅ 클릭한 카드가 열려있지 않은 경우에만 펼치기
      if (!isOpen) {
        answer.setAttribute("data-open", "true");
        answer.style.display = "block";
        answer.style.transition = "height 0.3s ease, opacity 0.3s ease";
        answer.style.height = answer.scrollHeight + "px";
        answer.style.opacity = "1";

        card.classList.add("open"); // 회전 적용

        answer.addEventListener("transitionend", function handler(e) {
          if (e.propertyName === "height") {
            answer.style.height = "auto"; // 펼침 완료 후 자동 높이로
            answer.removeEventListener("transitionend", handler);
          }
        });
      }
    });
  });
});
