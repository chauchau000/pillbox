from app.models import db, Provider, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_providers():
    batman = Provider(
        name='Bruce Wayne', address="224 Park Drive Gotham City, California", specialty="Cardiology", phone='1234567890', fax='0987654321')
    superman = Provider(
        name='Clark Kent', address="344 Clinton Street, Apartment 3D Metropolis, New York", specialty="Primary Care", phone='1234567890', fax='0987654321')
    wonder_woman = Provider(
        name='Diana Prince', address="2600 Virginia Ave Washington DC", specialty="Nephrology", phone='1234567890', fax='0987654321')
    ironman = Provider(
        name='Tony Stark', address="10880 Malibu Point Malibu, California", specialty="Primary Care", phone='1234567890', fax='0987654321')
    hulk = Provider(
        name='Bruce Banner', address="123 Hollywood Way Hollywood, California", specialty="Psychiatry", phone='1234567890', fax='0987654321')

    db.session.add(batman)
    db.session.add(superman)
    db.session.add(wonder_woman)
    db.session.add(ironman)
    db.session.add(hulk)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_providers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.providers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM providers"))
        
    db.session.commit()