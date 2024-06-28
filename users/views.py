from django.shortcuts import render, redirect
from .forms import RegistrationForm
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout



# Create your views here.
def index(request):
    pass

def registration(request):
    if request.method == 'POST':
        print(request.POST, '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        # Create a form that has request.POST
        form = RegistrationForm(request.POST)

        if form.is_valid():
            # CSRF may require additional code
            user = form.save(commit=False)

            # Set the user's password securely
            email = form.cleaned_data['email']
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            phone = form.cleaned_data['phone']
            city = form.cleaned_data['city']
            state = form.cleaned_data['state']
            isPrivateEmail = form.cleaned_data['isPrivateEmail']
            isPrivatePhone = form.cleaned_data['isPrivatePhone']
            password1 = form.cleaned_data['password1']
            password2 = form.cleaned_data['password2']

            if password1 == password2:
                user.set_password(password1)
                user.save()

                messages.success(request, f'Your Account has been created {first_name}!')
                # return redirect('login')
                return JsonResponse(form.cleaned_data)
                    # ^ Could be a problem point 
        else:
            # Handle password mismatch error
            form.add_error('password2', 'Passwords do not match')
    else:
        form = RegistrationForm()
    # return render(request, 'users/registration.html', {'form': form})
    return JsonResponse({'error': form.errors})
                            # ^ Eventually return Json

def user_login(request):
    email = request.POST["email"]
    password = request.POST["password"]
    user = authenticate(request, email=email, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({'success': 'Login Successful'})
    else:
        return JsonResponse({'error': 'Login Failed'})

def user_logout(request):
    logout(request)
    return JsonResponse({'success': 'Logout Successful'})