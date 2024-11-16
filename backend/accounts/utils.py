
from django.contrib.auth.models import User

def generate_password():
    """Generates a random password using Django's built-in utility."""
    return User.objects.make_random_password()
