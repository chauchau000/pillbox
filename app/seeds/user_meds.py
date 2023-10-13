from app.models import db, User_Med, environment, SCHEMA
from sqlalchemy.sql import text


def seed_user_meds():
    #user1
    med1 = User_Med(
        med_id=1, user_id=1, provider_id=1, strength='10mg', 
        directions='Take 1 tablet once daily in the morning',
        indication="High blood pressure",
        active=True
    )
    med2 = User_Med(
        med_id=2, user_id=1, provider_id=2, strength='500mg', 
        directions='Take 1 tablet twice daily',
        indication="Diabetes",
        active=True
    )
    med3 = User_Med(
        med_id=3, user_id=1, provider_id=2, strength='30mg', 
        directions='Take 1 tablet once daily in the morning',
        indication="Diabetes",
        active=True
    )
    med4 = User_Med(
        med_id=7, user_id=1, provider_id=5, strength='20mg', 
        directions='Take 1 tablet once daily at noon',
        indication="Depression",
        active=False
    )

    #user 2
    med5 = User_Med(
        med_id=6, user_id=2, provider_id=2, strength='500mg', 
        directions='Take 1 tablet every 6 hours',
        indication="Pain",
        active=True
    )
    med6 = User_Med(
        med_id=8, user_id=2, provider_id=5, strength='10mg', 
        directions='Take 1 tablet once daily in the morning',
        indication="Depression", active=True
    )
    med7 = User_Med(
        med_id=10, user_id=2, provider_id=2, strength='40mg', 
        directions='Take 1 tablet once daily at bedtime',
        indication="High cholesterol",
        active=True
    )
    med8 = User_Med(
        med_id=16, user_id=2, provider_id=2, strength='100mg', 
        directions='Take 1 tablet once daily in the morning',
        indication="Gout",
        active=True
    )

    #user 3
    med9 = User_Med(
        med_id=5, user_id=3, provider_id=4, strength='600mg', 
        directions='Take 1 tablet every 6 hours as needed',
        indication="Pain",
        active=True
    )
    med10 = User_Med(
        med_id=13, user_id=3, provider_id=1, strength='10mg', 
        directions='Take 1 tablet once daily',
        indication="High blood pressure",
        active=True
    )
    med11 = User_Med(
        med_id=10, user_id=3, provider_id=1, strength='40mg', 
        directions='Take 1 tablet once daily at bedtime',
        indication="High cholesterol",
        active=True
    )
    med12 = User_Med(
        med_id=15, user_id=3, provider_id=4, strength='10mg', 
        directions='Take 1 tablet twice daily',
        indication="High blood pressure",
        active=True
    )




    db.session.add(med1) #
    db.session.add(med2) #
    db.session.add(med3) #
    db.session.add(med4) #
    db.session.add(med5) #
    db.session.add(med6) #
    db.session.add(med7) #
    db.session.add(med8) #
    db.session.add(med9) #
    db.session.add(med10) #
    db.session.add(med11) #
    db.session.add(med12) #
    db.session.commit()



def undo_user_meds():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_meds RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_meds"))
        
    db.session.commit()