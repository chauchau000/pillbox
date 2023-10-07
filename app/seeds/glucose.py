from app.models import db, Glucose, environment, SCHEMA
from sqlalchemy.sql import text


def seed_glucose():
    #user1
    glu1 = Glucose(
        level=100, 
        user_id=1, 
        date="10/2/2023", 
        time='8:00am'
    )

    glu2 = Glucose(
        level=160, 
        user_id=1, 
        date="10/2/2023", 
        time='12:00pm'
    )

    glu3 = Glucose(
        level=200, 
        user_id=1, 
        date="10/2/2023", 
        time='8:00pm'
    )
    glu4 = Glucose(
        level=120, 
        user_id=1, 
        date="10/3/2023", 
        time='8:00am'
    )
    glu5 = Glucose(
        level=175, 
        user_id=1, 
        date="10/3/2023", 
        time='12:00pm'
    )
    glu6 = Glucose(
        level=160, 
        user_id=1, 
        date="10/3/2023", 
        time='8:00pm'
    )
    glu7 = Glucose(
        level=125, 
        user_id=1, 
        date="10/4/2023", 
        time='8:00am'
    )
    glu8 = Glucose(
        level=145, 
        user_id=1, 
        date="10/4/2023", 
        time='12:00pm'
    )
    glu9 = Glucose(
        level=132, 
        user_id=1, 
        date="10/4/2023", 
        time='8:00pm'
    )
    glu10 = Glucose(
        level=167, 
        user_id=1, 
        date="10/5/2023", 
        time='8:00am'
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