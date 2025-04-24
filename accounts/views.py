# 5. accounts/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.views import LoginView
from django.contrib import messages
from django.urls import reverse_lazy

class CustomLoginView(LoginView):
    template_name = 'registration/login.html'
    def get_success_url(self):
        return reverse_lazy('faq_list')

# ✅ 로그아웃 함수형 뷰 (GET 허용)
def custom_logout(request):
    logout(request)
    messages.success(request, '성공적으로 로그아웃되었습니다.')
    return redirect('/')
