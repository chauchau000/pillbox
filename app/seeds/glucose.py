from app.models import db, Glucose, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

def seed_glucose():
    #user1
    glu1 = Glucose(
        level=100, 
        user_id=1, 
        date=datetime.date(2023,10,2), 
        time=datetime.time(8,0)
    )

    glu2 = Glucose(
        level=160, 
        user_id=1, 
        date=datetime.date(2023,10,2), 
        time=datetime.time(12,0)
    )

    glu3 = Glucose(
        level=200, 
        user_id=1, 
        date=datetime.date(2023,10,2), 
        time=datetime.time(20,0)
    )
    glu4 = Glucose(
        level=120, 
        user_id=1, 
        date=datetime.date(2023,10,3), 
        time=datetime.time(8,0)
    )
    glu5 = Glucose(
        level=175, 
        user_id=1, 
        date=datetime.date(2023,10,3), 
        time=datetime.time(12,0)
    )
    glu6 = Glucose(
        level=160, 
        user_id=1, 
        date=datetime.date(2023,10,3), 
        time=datetime.time(20,0)
    )
    glu7 = Glucose(
        level=125, 
        user_id=1, 
        date=datetime.date(2023,10,4), 
        time=datetime.time(8,0)
    )
    glu8 = Glucose(
        level=145, 
        user_id=1, 
        date=datetime.date(2023,10,4), 
        time=datetime.time(12,0)
    )
    glu9 = Glucose(
        level=132, 
        user_id=1, 
        date=datetime.date(2023,10,4), 
        time=datetime.time(20,0)
    )
    glu10 = Glucose(
        level=167, 
        user_id=1, 
        date=datetime.date(2023,10,5), 
        time=datetime.time(8,0)
    )

    db.session.add(glu1)
    db.session.add(glu2)
    db.session.add(glu3)
    db.session.add(glu4)
    db.session.add(glu5)
    db.session.add(glu6)
    db.session.add(glu7)
    db.session.add(glu8)
    db.session.add(glu9)
    db.session.add(glu10)
    db.session.commit()



def undo_glucose():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.glucose_levels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM glucose_levels"))
        
    db.session.commit()