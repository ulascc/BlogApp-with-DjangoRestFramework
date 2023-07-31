from django.contrib import admin
from django.urls import path
from account.views import RegisterView, LoginView, login_page, register_page

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('registerPage/', register_page),
    path('login/', LoginView.as_view()),
    path('loginPage/', login_page),
]