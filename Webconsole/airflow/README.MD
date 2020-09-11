# Airflow install in Mac OSX
## 1. Pre
## 2. install PIP
## 3. airflow user configuration
## 4. airflow password creation
### Noted: airflow passwrod is required flask_bcrypt 
```
pip install flask_bcrypt
```
### start change password
```
(tsenv) ➜  airflow python
Python 3.8.2 (default, Mar 26 2020, 10:43:30)
[Clang 4.0.1 (tags/RELEASE_401/final)] :: Anaconda, Inc. on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> from airflow import models, settings
>>> from airflow.contrib.auth.backends.password_auth import PasswordUser
>>> user = PasswordUser(models.User())
>>> user.username = '<username>'
>>> user.email = '<email address>'
>>> user.password = '<password>'
>> session = settings.Session()
>>> session.add(user)
>>> session.commit()
>>> session.close()
>>> exit()
```


```
pR0zPB6msE
curl --header "rest_api_plugin_http_token: pR0zPB6msE" http://localhost:8080/admin/rest_api/api?api=version
```

```
curl -XPOST http://localhost:8080/api/v1/security/login -H "Content-Type: application/json" -d '{"username":"lanphan", "password":"..", "refresh":true, "provider": "db"}' 
```


```

curl -H 'Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTk3OTY3NTQsIm5iZiI6MTU5OTc5Njc1NCwianRpIjoiZWY4ZDQ1MzAtNzAwOC00MzQxLWEwOTMtMGIxMmY5M2Q3NTg5IiwiZXhwIjoxNTk5Nzk3NjU0LCJpZGVudGl0eSI6MSwiZnJlc2giOnRydWUsInR5cGUiOiJhY2Nlc3MifQ.4B4te9jfZfkVLZUNYCZDytVxPdtZCUXM9EL102tSAnw' http://localhost:8080/admin/rest_api/api?api=version
```