from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import password_validation
from django.contrib.auth import get_user_model

User = get_user_model()

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=200,required=True, help_text='Required')
    first_name = forms.CharField(max_length=200, help_text='Required')
    last_name = forms.CharField(max_length=200, help_text='Required')
    phone = forms.CharField(max_length=200, help_text='Required')
    city = forms.CharField(max_length=200, help_text='Required')
    state = forms.CharField(max_length=200, help_text='Required')
    isPrivateEmail = forms.BooleanField(required=False)
    isPrivatePhone = forms.BooleanField(required=False)
    password1 = forms.CharField(
        label='Password',
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'id': "password"}),
        help_text=password_validation.password_validators_help_text_html(),
    )
    password2 = forms.CharField(
        label='Confirm Password',
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
    )

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'phone', 'city', 'state', 'isPrivateEmail', 'isPrivatePhone', 'email')