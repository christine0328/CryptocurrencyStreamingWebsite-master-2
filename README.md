# Crypto Demyth website

ENGINE': 'django.db.backends.mysql',
        'NAME': 'gdax',
        'USER': 'root',
        'PASSWORD': '123456',
        'HOST': '127.0.0.1',
        'PORT': '3306',
Make sure everyone create a mysql database with this username and password and database name is gdax

How to run it:
In terminal,
find the folder where the 'bitcoin' folder is,
1. cd bitcoin
2. cd whale-discovering 
3. pip install -r requirements.txt
4. python whale.py
That's to run 'insight' page. Next, open new terminal inside 'bitcoin' folder,
5. python3 manage.py runserver
6. For the first time, 127.0.0.1:8000/getdata
7. in your browser URL box, input: 127.0.0.1:8000/home
