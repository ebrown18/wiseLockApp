

# Create your models here.

# users/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser, User

class User(AbstractUser):
    """User model extending Django's default User model."""
    # Django's User model already includes fields for username, email, password

class Password(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    label = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.label}: {self.value}"

