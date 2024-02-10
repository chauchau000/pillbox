from app.models import db, Glucose, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime,timedelta, time
import random


def seed_glucose():
    # user1
    date = datetime(2024,2,1)

    for x in range(45):
        glu1 = Glucose(
            level=random.randint(100, 250),
            user_id=1,
            date=date + timedelta(days=x),
            time=time(8, 0),
            notes="Ate a banana",
        )

        glu2 = Glucose(
            level=random.randint(100, 250),
            user_id=1,
            date=date + timedelta(days=x),
            time=time(12, 0),
            notes="Ate a large lunch",
        )

        glu3 = Glucose(
            level=random.randint(100, 250),
            user_id=2,
            date=date + timedelta(days=x),
            time=time(20, 0),
            notes="Hamburger and fries",
        )

        glu4 = Glucose(
            level=random.randint(100, 250),
            user_id=2,
            date=date + timedelta(days=x),
            time=time(8, 0),
            notes="Ate an apple",
        )

        glu5 = Glucose(
            level=random.randint(100, 250),
            user_id=2,
            date=date + timedelta(days=x),
            time=time(12, 0),
            notes="Salad with honey mustard dressing",
        )

        glu6 = Glucose(
            level=random.randint(100, 250),
            user_id=1,
            date=date + timedelta(days=x),
            time=time(20, 0),
            notes="Combo pizza slice",
        )
        db.session.add(glu1)
        db.session.add(glu2)
        db.session.add(glu3)
        db.session.add(glu4)
        db.session.add(glu5)
        db.session.add(glu6)

    db.session.commit()


def undo_glucose():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.glucose_levels RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM glucose_levels"))

    db.session.commit()
