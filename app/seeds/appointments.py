from app.models import db, Appointment, environment, SCHEMA
from sqlalchemy.sql import text




# Adds a demo user, you can add other users here if you want
def seed_appointments():
    appt1 = Appointment(
        user_id=1, provider_id=1, date="12/2/2023", time='10:00am')    
    appt2 = Appointment(
        user_id=1, provider_id=2, date="1/2/2024", time='12:00pm')
    appt3 = Appointment(
        user_id=1, provider_id=5, date="11/2/2023", time='10:00am')

    db.session.add(appt1)
    db.session.add(appt2)
    db.session.add(appt3)

    appt4 = Appointment(
        user_id=2, provider_id=2, date="12/2/2023", time='10:00am')    
    appt5 = Appointment(
        user_id=2, provider_id=2, date="1/2/2024", time='10:00am')
    appt6 = Appointment(
        user_id=2, provider_id=5, date="11/2/2023", time='10:00am')

    db.session.add(appt4)
    db.session.add(appt5)
    db.session.add(appt6)

    appt7 = Appointment(
        user_id=3, provider_id=4, date="12/2/2023", time='10:00am')    
    appt8 = Appointment(
        user_id=3, provider_id=1, date="1/2/2024", time='3:00pm')
    appt9 = Appointment(
        user_id=3, provider_id=1, date="11/2/2023", time='10:00am')

    db.session.add(appt7)
    db.session.add(appt8)
    db.session.add(appt9)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_appointments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.appointments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM appointments"))
        
    db.session.commit()