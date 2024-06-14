from django.db import models

# Create your models here.
class Users(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    isPrivateEmail = models.BooleanField(default=False)
    isPrivatePhone = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)