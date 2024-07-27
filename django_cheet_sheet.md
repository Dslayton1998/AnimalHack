``` python3 -m venv .venv```

```source .venv/bin/activate```

```python3 -m pip install django```

```deactivate```

```django-admin startproject projectname .```

To run the server - optional portnumber
```python manage.py runserver portnumber```

```pip freeze > requirements.txt``` generates the requirements.txt file
``` pip install -r requirements.txt``` installs the requirements





making models
``` python manage.py startapp <name>```

update urls in backend/settings.py

to migrate
add app to INSTALLED_APPS backend/settings.py
run 
```python manage.py makemigrations <name>```

When creating a custom user model - if setting a different field to the default username i.e. email
user admin will cause errors due to looking for the default Username field. remove userAdmin from admin.site.register or research how to manually edit the admin user class to set ordering to your custom field.

To start the backend => ```python manage.py runserver```