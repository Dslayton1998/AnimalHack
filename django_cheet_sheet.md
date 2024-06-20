``` python3 -m venv .venv```

```source .venv/bin/activate```

```python3 -m pip install django```

```deactivate```

```django-admin startproject projectname .```

To run the server - optional portnumber
```python manage.py runserver portnumber```





making models
``` python manage.py startapp <name>```

update urls in backend/settings.py

to migrate
add app to INSTALLED_APPS backend/settings.py
run 
```python manage.py makemigrations <name>```