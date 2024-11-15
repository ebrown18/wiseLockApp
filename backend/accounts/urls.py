# accounts/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, PasswordViewSet
from . import views

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'passwords', PasswordViewSet)

urlpatterns = [
    path("login/", views.login, name="login"),
    path("add_password/", views.add_password, name="add_password"),
    path("password_list/", views.password_list, name="password_list"),
    path("update_password/<int:password_id>/", views.update_password, name="update_password"),
    path('', include(router.urls)),
]

