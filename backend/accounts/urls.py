# users/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("add_password/", views.add_password, name="add_password"),
    path("password_list/", views.password_list, name="password_list"),
    path("update_password/<int:password_id>/", views.update_password, name="update_password"),
]
