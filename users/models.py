from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth import get_user_model
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
    # USER_TYPE_CHOICES = (
    #     ('admin', 'Admin'),
    #     ('user', 'User'),
    # )
    # user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='user')
    username = None
    first_name=models.CharField(max_length=200)
    last_name=models.CharField(max_length=200)
    email=models.EmailField(blank=True, max_length=254, verbose_name='email address', unique=True)
    email_is_verified = models.BooleanField(default=False)
    phone=models.CharField(max_length=200)
    city=models.CharField(max_length=200)
    state=models.CharField(max_length=200)
    isPrivateEmail=models.BooleanField(default=False)
    isPrivatePhone=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    list_display=('email', 'first_name', 'last_name', 'phone', 'city', 'state', 'isPrivateEmail', 'isPrivatePhone', 'email_is_verified', 'ordering')
    ordering = ('email')

    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def to_dict(self):
        return {
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'city': self.city,
            'state': self.state,
            'isPrivateEmail': self.isPrivateEmail,
            'isPrivatePhone': self.isPrivatePhone,
            'email_is_verified': self.email_is_verified
        }
