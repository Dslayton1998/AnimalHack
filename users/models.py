from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='user')
    first_name=models.CharField(max_length=200)
    last_name=models.CharField(max_length=200)
    phone=models.CharField(max_length=200)
    city=models.CharField(max_length=200)
    state=models.CharField(max_length=200)
    isPrivateEmail=models.BooleanField(default=False)
    isPrivatePhone=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
