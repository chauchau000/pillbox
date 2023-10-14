from app.models import db, User, Provider, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users_and_providers():
    demo = User(
        first_name='Demo', last_name="User", dob="10/2/1965", email='demo@aa.io', password='password')
    marnie = User(
        first_name='marnie', last_name="User", dob="1/5/1967", email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='bobbie', last_name="User", dob="11/12/1990", email='bobbie@aa.io', password='password')

    batman = Provider(
        name='Bruce Wayne', address="224 Park Drive", city='Gotham City', state='California', specialty="Cardiology", phone='1234567890')
    superman = Provider(
        name='Clark Kent', address="344 Clinton Street, Apartment 3D", city='Metropolis', state='New York', specialty="Primary Care", phone='1234567890')
    wonder_woman = Provider(
        name='Diana Prince', address="2600 Virginia Ave", city='Washington DC', state='Washington DC',  specialty="Nephrology", phone='1234567890')
    ironman = Provider(
        name='Tony Stark', address="10880 Malibu Point", city='Malibu', state='California', specialty="Primary Care", phone='1234567890')
    hulk = Provider(
        name='Bruce Banner', address="123 Hollywood Way", city='Hollywood', state='California', specialty="Psychiatry", phone='1234567890')

    demo.providers.append(batman)
    demo.providers.append(superman)
    demo.providers.append(hulk)

    marnie.providers.append(superman)
    marnie.providers.append(hulk)

    bobbie.providers.append(ironman)
    bobbie.providers.append(batman)

    db.session.add(batman)
    db.session.add(superman)
    db.session.add(wonder_woman)
    db.session.add(ironman)
    db.session.add(hulk)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users_and_providers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.providers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        db.session.execute(text("DELETE FROM providers"))
        
    db.session.commit()