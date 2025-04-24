from django.urls import path
from .views import CustomLoginView, custom_logout

urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', custom_logout, name='logout'),
]