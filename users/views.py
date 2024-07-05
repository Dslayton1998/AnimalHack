from django.contrib.auth import authenticate, login, logout, get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from django.template.loader import render_to_string
from django.shortcuts import render, redirect
from .tokens import account_activation_token
from django.core.mail import EmailMessage
from django.http import JsonResponse
from .forms import RegistrationForm
from django.contrib import messages

User = get_user_model()



# User Registration:
def index(request):
    pass

def registration(request):
    if request.method == 'POST':
        # Create a form that has request.POST
        form = RegistrationForm(request.POST)

        if form.is_valid():
            # CSRF may require additional code
            user = form.save(commit=False)
            next = request.POST.get('next')

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

                new_user = authenticate(email=email, password=password1)
                login(request, new_user)

                # messages.success(request, f'Your Account has been created {first_name}!') 
                if (next):
                    return redirect(next)
                else:
                    return redirect('verify-email')

                # return JsonResponse(form.cleaned_data)
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


# Email Verification Views:
def verify_email(request):
    if request.method == "POST":
        if request.user.email_is_verified != True:
            current_site = get_current_site(request)
            user = request.user
            email = request.user.email
            subject = 'Verify Your Email'
            message = render_to_string('user/verify_email.html', {
                'request': request,
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
            email = EmailMessage(subject,message, to=[email])
            email.content_subtype = 'html'
            email.send()
            return JsonResponse({'success': 'Email Sent'})
        else:
            return JsonResponse({'error': 'Email Already Verified'})
    return render(request, 'user/verify_email.html')
    # return JsonResponse({'error': 'Invalid Request'})
        
def verify_email_done(request):
    return render(request, 'user/verify_email_done.html')

def verify_email_confirm(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.email_is_verified = True
        user.save()
        messages.success(request, 'Your email has been verified!')
        # return redirect('verify-email-complete')
        return JsonResponse({'success': 'Verification successful'})
    else:
        messages.warning(request, 'The link is invalid.')
    return render(request, 'user/verify_email_confirm.html')
    # ^ Could use some change yet tbd

def verify_email_complete(request):
    return render(request, 'user/verify_email_complete.html')


# Users CRUD:
def user_get(request, id):
    user = user.object.get(id = id)
    return JsonResponse(user)

def user_delete(request, email):
    user = user.objects.get(email = email)
    try:
        user.delete()
    except:
        return JsonResponse("Could not delete user.")


def user_update(request):
    pass