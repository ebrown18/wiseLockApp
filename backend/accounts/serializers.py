# accounts/serializers.py
from rest_framework import serializers # type: ignore
from .models import User, Password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Password
        fields = ['id', 'label', 'value', 'user']
