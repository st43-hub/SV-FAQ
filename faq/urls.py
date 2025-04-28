# ✅ faq/urls.py - FAQ 앱의 URL 라우팅 설정 (회원가입 차단 추가)

from django.urls import path  # 경로 설정 함수 import
from . import views  # 같은 앱 내의 views.py import
from django.shortcuts import redirect  # 회원가입 차단용 함수 추가

# ✅ 네임스페이스 지정: 템플릿에서 'faq:faq_list'처럼 호출 가능
app_name = 'faq'

# 🚫 회원가입 URL 막기용 함수

def block_signup(request):
    return redirect('/')  # 메인 페이지로 강제 이동

urlpatterns = [
    # 📋 FAQ 리스트 페이지 (기본 루트)
    path('', views.faq_list, name='faq_list'),

    # ➕ FAQ 추가 페이지
    path('add/', views.add_faq, name='add_faq'),

    # ✏️ FAQ 수정 페이지 (pk = 질문 ID)
    path('edit/<int:pk>/', views.edit_faq, name='edit_faq'),

    # 🗑️ FAQ 삭제 요청 처리
    path('delete/<int:pk>/', views.delete_faq, name='delete_faq'),

    # 📊 관리자용 통계 페이지 (그래프 포함)
    path('stats/', views.faq_stats, name='faq_stats'),

    # 📤 FAQ 백업 내보내기 (JSON)
    path('export/', views.export_faqs, name='export_faqs'),

    # 📥 FAQ 데이터 불러오기 (JSON)
    path('import/', views.import_faqs, name='import_faqs'),

    # 🚫 회원가입 URL 차단 경로 추가
    path('accounts/signup/', block_signup, name='block_signup'),
]