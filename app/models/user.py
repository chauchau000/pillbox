from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from .users_providers import users_providers


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    dob = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    user_meds = relationship("User_Med", back_populates='user', cascade='all, delete-orphan')
    providers = relationship("Provider", secondary=users_providers, back_populates='patients')
    glucose_readings = relationship("Glucose", back_populates='user', cascade='all, delete-orphan')
    appointments = relationship("Appointment", back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'dob': self.dob,
            'email': self.email,
        }

    def my_meds(self):
        meds = [med.to_dict() for med in self.user_meds]
        return meds
    
    def my_providers(self):
        providers = [provider.to_dict() for provider in self.providers]
        return providers

    def my_appointments(self):
        appointments = [appointment.to_dict() for appointment in self.appointments]
        return {
            'appointments': appointments,
        }

    def my_glucose(self):
        glucose = [reading.to_dict() for reading in self.glucose_readings]
        return {
            'glucose': glucose
        }

