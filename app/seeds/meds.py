from app.models import db, Med, environment, SCHEMA
from sqlalchemy.sql import text


def seed_meds():
    enalapril = Med(
        name='Enalapril', strengths='10mg, 20mg, 30mg, 40mg', side_effects="fatigue, headache, dizziness, cough, rash, fainting, chest pain"
    )
    metformin = Med(
        name='Metformin', strengths='500mg, 850mg, 1000mg', side_effects="diarrhea, nausea/vomiting, flatulence, abdominal discomfort, indigestion"
    )
    pioglitazone = Med(
        name='Pioglitazone', strengths='15mg, 30mg, 45mg', side_effects="respiratory infection, headache, sinusitis, muscle pain, pharyngitis"
    )
    glimepiride = Med(
        name='Glimepiride', strengths='1mg, 2mg, 4mg', side_effects="headache, hypoglycemia, nausea, dizziness"
    )
    ibuprofen = Med(
        name='Ibuprofen', strengths='200mg, 400mg, 600mg', side_effects="indigestion, headache, dizziness, drowsiness, fatigue, thirst, sweating, fluid retention, ankle swelling"
    )
    acetaminophen = Med(
        name='Acetaminophen', strengths='325mg, 500mg, 1000mg', side_effects="rash, blistering skin, hives, itching, allergic reaction, hoarseness"
    )
    citalopram = Med(
        name='Citalopram', strengths='20mg, 40mg, 60mg', side_effects="fever, sweating, confusion, fast or irregular heartbeat, severe muscle stiffness or twitching, agitation, hallucinations, loss of coordination, nausea, vomiting, diarrhea"
    )
    escitalopram = Med(
        name='Escitalopram', strengths='5mg, 10mg, 20mg', side_effects="headache, nausea, diarrhea, dry mouth, increased sweating, feeling nervous, restless, fatigue, or having trouble sleeping (insomnia)"
    )
    losartan = Med(
        name='Losartan', strengths='25mg, 50mg, 100mg', side_effects="dizzness, headaches, nausea/vomiting, diarrhea, muslce pain"
    )
    rosuvastatin = Med(
        name='Rosuvastatin', strengths='5mg, 10mg, 20mg, 40mg', side_effects="nausea, indigestion, headache, muscle aches, nosebleed, diarreha, sore throat"
    )
    atorvastatin = Med(
        name='Atorvastatin', strengths='5mg, 10mg, 20mg, 40mg', side_effects="nausea, indigestion, headache, muscle aches, nosebleed, diarreha, sore throat"
    )
    duloxetine = Med(
        name='Duloxetine', strengths='20mg, 30mg, 40mg, 60mg', side_effects="headache, nausea, diarrhea, dry mouth, increased sweating, feeling nervous, restless, fatigue, or having trouble sleeping (insomnia)"
    )
    amlodipine = Med(
        name='Amlodipine', strengths='5mg, 10mg', side_effects="swelling of hands or feet, headache, upset stomach, nausea, stomach pain, dizziness, drowsiness, fatigue"
    )
    omeprazole = Med(
        name='Omeprazole', strengths='10mg, 20mg, 40mg', side_effects="back pain, stomach pain, leg pain, bleeding or sores on lip, blisters"
    )
    lisinopril = Med(
        name='Lisinopril', strengths='10mg, 20mg, 30mg, 40mg', side_effects="dry cough, dizziness, lightheadedness, headaches, vomiting, diarrhea, itching, blurred vision"
    )
    allopurinol = Med(
        name='Allopurinol', strengths='100mg, 300mg', side_effects="unpleasant taste in mouth, blindness, body aches or pain, burning feeling in chest or stomach, dry or itchy eyes, change in teeth, sensation of pins and needles"
    )

    db.session.add(enalapril) #1
    db.session.add(metformin) #2
    db.session.add(pioglitazone) #3
    db.session.add(glimepiride) #4
    db.session.add(ibuprofen) #5
    db.session.add(acetaminophen) #6
    db.session.add(citalopram) #7
    db.session.add(escitalopram) #8
    db.session.add(losartan)
    db.session.add(rosuvastatin) #10
    db.session.add(atorvastatin)
    db.session.add(duloxetine) #12
    db.session.add(amlodipine) 
    db.session.add(omeprazole)
    db.session.add(lisinopril) #15
    db.session.add(allopurinol)
    db.session.commit()



def undo_meds():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.meds RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM meds"))
        
    db.session.commit()