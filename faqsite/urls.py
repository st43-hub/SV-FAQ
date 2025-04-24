# ✅ urls.py – media 파일 제공 설정 포함 + accounts 연결

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),  # ✅ 로그인/회원가입 URL 연결
    path('', include('faq.urls')),                # FAQ 앱의 URL 포함
]

# ✅ 개발환경에서 media 파일 제공
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
