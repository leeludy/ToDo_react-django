# Content

The well-known experimental To Do app <br/> A simple project to discover Python,
how React take place in Django, and building Api with this whole little world.

---

### Branches

Here are differents frontend approaches with variations around the use of
librairy like **_react-hook-form_** or **_tanstak-query_**

**<font color='darkgreen'>Main</font>**<br/> Base Api before styling

**<font color='green'>Micros</font>**<br/> one action one request

**<font color='lightgreen'>Batch</font>**<br/> react-hook-form useFieldArray put
into practice

---

### Set up

This is a _Django Rest Framework_ application using the included Sqlite bd <br/>
_React_ is provided by _Vite_

#### prerequisites

- python3
- node18

#### steps

clone the chosen branch <br/> set up your python environment and create your
admin user: <br/>

```
 . .venv/bin/activate
 python manage.py createsuperuser
 cd backend
 python manage.py makemigrations todo
 python manage.py migrate
 python manage.py runserver
```

install and connect Front :<br/>

```
cd frontend
```

add .env file and enter your connection url with the Back<br/> Default
configuration:

```
VITE_API_URL=http://127.0.0.1:8000/api/
```

```
pnpm install
pnpm run dev
```
