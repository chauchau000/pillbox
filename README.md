<h1 align='center'> pillbox :pill:</h1>

<h3>Description</h3>
<p>Users will be able to add their medications, providers, appointments, glucose log, and pharmacies in one centralized location. The app will simplify the user's medication usage, breaking down which medications should be taken when. The app will organize the user's medication list in simple website designed for intuitive use. The app will also keep track of all the user's appointments in a calendar. </p>

<div align='center'> <a href='https://pillbox.onrender.com/'>Demo Live Link</a> </div>


<h3>Login Page</h3>

![Screenshot 2024-02-06 at 6 15 03 PM](https://github.com/chauchau000/pillbox/assets/117422078/e705af45-dcc5-41e6-a365-1c6328590c6c)

<h3>Medication Home Page</h3>

![Screenshot 2024-02-06 at 6 14 40 PM](https://github.com/chauchau000/pillbox/assets/117422078/c1549a04-0cfb-4a4c-bfb0-0e31d95bba91)

<h3>Glucose Chart</h3>

![Screenshot 2024-02-06 at 6 14 54 PM](https://github.com/chauchau000/pillbox/assets/117422078/639ec494-5422-4318-8e02-10ff60476071)


<h3>Appointment Calendar</h3>

![Screenshot 2024-02-06 at 6 14 47 PM](https://github.com/chauchau000/pillbox/assets/117422078/abd80077-f2ed-4ca7-bec4-02d2b0a000fc)


### Getting Started

1. Clone this repository

```
git clone https://github.com/chauchau000/pillbox.git
```
   
2. Install backend dependencies, including python server. In the root folder:

```
pipenv install
```

3. Install frontend dependencies. In the react-app folder:

```
npm install
```

4.  Set up database with seeders and run. In the root folder:

```
   pipenv shell
   flask db upgrade
   flask seed all
   flask run -p 5001

```
5. Start frontend server. In the react-app folder:
```
npm start
```

6. Create your own account and start your medication inventory!

### Application Architecture

robinhoodie is built on React and Redux front end with a Python Flask backend, using PostgresSQL as a database. 

### Technologies used
<div>
   <img src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E' />
   <img src='https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue' />
   <img src='https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white' />
   <img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' />
   <img src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white' />
   <img src='https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white' />
   <img src='https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white' />
   <img src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white' />
   <img src='https://img.shields.io/badge/Chart%20js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white' />
</div>


