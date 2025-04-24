# ✅ models.py – FAQ 모델 정의 (이미지 업로드 전용)

from django.db import models

# 📦 FAQ 모델 정의
class FAQ(models.Model):
    question = models.CharField(max_length=200)  # ❓ 질문
    answer = models.TextField()                  # 💬 답변
    category = models.CharField(max_length=50)   # 📁 카테고리
    area = models.CharField(max_length=50)       # 🧭 구역 (LD, RBD 등)

    # 🖼️ 이미지 업로드 필드 (URL 대신 파일 첨부 전용)
    image = models.ImageField(
        upload_to='faq_images/',     # 업로드 경로: MEDIA_ROOT/faq_images/
        blank=True, null=True        # 첨부하지 않아도 됨 (선택사항)
    )

    def __str__(self):
        return self.question  # 객체를 문자열로 표시할 때 질문 내용 반환