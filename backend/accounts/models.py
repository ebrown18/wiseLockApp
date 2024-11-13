from django.db import models

# Create your models here.

# users/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """User model extending Django's default User model."""
    # Django's User model already includes fields for username, email, password

class Password(models.Model):
    """Model for storing passwords with labels and association to users."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="passwords")
    label = models.CharField(max_length=100)  # Label for the password
    value = models.CharField(max_length=255)  # Actual password value

    def __str__(self):
        return self.label
