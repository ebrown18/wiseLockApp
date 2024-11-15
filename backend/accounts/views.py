from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .models import Password, User
from .serializers import PasswordSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets 
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


# Signup API view (for creating a user)
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

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
class PasswordViewSet(viewsets.ModelViewSet):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer
    permission_classes = [IsAuthenticated]

# Login API view (for user authentication)
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


# Password List API view (for fetching passwords)
@api_view(['GET'])
def password_list(request):
    if not request.user.is_authenticated:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    passwords = Password.objects.filter(user=request.user).order_by("label")
    serializer = PasswordSerializer(passwords, many=True)
    return Response(serializer.data)


# Add Password API view (to add a password)
@api_view(['POST'])
def add_password(request):
    if not request.user.is_authenticated:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    label = request.data.get('label')
    value = request.data.get('value')

    if not label or not value:
        return Response({"error": "Label and value are required."}, status=status.HTTP_400_BAD_REQUEST)

    # Create and save the password
    password = Password.objects.create(user=request.user, label=label, value=value)
    serializer = PasswordSerializer(password)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# Update Password API view (to update an existing password)
@api_view(['POST'])
def update_password(request, password_id):
    if not request.user.is_authenticated:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    password = Password.objects.get(id=password_id, user=request.user)
    new_value = request.data.get("new_password")

    if not new_value:
        return Response({"error": "New password value is required."}, status=status.HTTP_400_BAD_REQUEST)

    password.value = new_value
    password.save()
    serializer = PasswordSerializer(password)
    return Response(serializer.data)
