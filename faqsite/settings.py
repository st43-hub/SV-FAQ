# ✅ settings.py (faqsite 기준으로 ROOT_URLCONF 경로 수정)

from pathlib import Path
import os

SECRET_KEY = 'i&g51x)$h2jtq10uf1w(6jvq1^0q#t^z3n6c=t(x$86oq5h$ah'

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'faq',
    'widget_tweaks'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # ✅ Render 배포용 정적 파일 처리를 위한 미들웨어 추가
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ✅ 프로젝트 이름에 맞춰 수정
ROOT_URLCONF = 'faqsite.urls'
WSGI_APPLICATION = 'faqsite.wsgi.application'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# ✅ Supabase PostgreSQL DB 연결 설정 (기존 sqlite3에서 변경)
DATABASES = {
   'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'Strad!Tiger25',
        'HOST': 'db.bwaycfcgkxqpqxthieqk.supabase.co',
        'PORT': '5432',
   }
}

AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = 'ko-kr'
TIME_ZONE = 'Asia/Seoul'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# ✅ 정적 파일 경로 설정 (Render 배포용 환경 반영)
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'  # ✅ collectstatic 명령어를 사용할 때 저장될 위치 지정

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

from django.contrib.messages import constants as messages
MESSAGE_TAGS = {
    messages.ERROR: 'danger',
    messages.SUCCESS: 'success',
    messages.WARNING: 'warning',
    messages.INFO: 'info',
}

LOGIN_REDIRECT_URL = '/'

# ✅ Render 배포용 설정 파일에 대한 안내 (코드가 아닌 실제 파일로 루트에 위치시켜야 함)
# 📌 아래 파일들은 최상위 루트 폴더에 수동으로 생성해줘야 합니다:
# - render.yaml
# - requirements.txt
# 예:
# ┣ manage.py
# ┣ render.yaml ← 이 위치에 생성
# ┣ requirements.txt ← 이 위치에 생성
# ┣ faqsite/
# ┗ ...
