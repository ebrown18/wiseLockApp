# users/views.py

from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .forms import UserLoginForm
from .models import Password
from .utils import generate_password

def login_view(request):
    if request.method == "POST":
        form = UserLoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            password = form.cleaned_data["password"]
            user = authenticate(request, username=email, password=password)
            if user is not None:
                login(request, user)
                return redirect("home")
            else:
                form.add_error(None, "Invalid email or password")
    else:
        form = UserLoginForm()
    return render(request, "users/login.html", {"form": form})


def add_password(request):
    if request.method == "POST":
        label = request.POST["label"]
        value = request.POST["value"]
        Password.objects.create(user=request.user, label=label, value=value)
        return redirect("password_list")

def password_list(request):
    passwords = Password.objects.filter(user=request.user).order_by("label")
    return render(request, "users/password_list.html", {"passwords": passwords})

def update_password(request, password_id):
    password = Password.objects.get(id=password_id, user=request.user)
    if request.method == "POST":
        new_value = request.POST["new_password"]
        password.value = new_value
        password.save()
        return redirect("password_list")
    return render(request, "users/update_password.html", {"password": password})

