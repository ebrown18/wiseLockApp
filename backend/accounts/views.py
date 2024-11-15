# users/views.py

from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .forms import UserLoginForm
from .models import Password
from .utils import generate_password
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from accounts.models import User, Password
from .serializers import UserSerializer, PasswordSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PasswordViewSet(viewsets.ModelViewSet):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer
    permission_classes = [IsAuthenticated]


@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password or not email:
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        validate_email(email)
    except ValidationError:
        return Response({"error": "Invalid email address."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Both username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(username=username).first()

    if user and user.check_password(password):
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    return Response({"error": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)



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


