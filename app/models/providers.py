from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from .users_providers import users_providers



class Provider(db.Model):
    __tablename__ = 'providers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    city = db.Column(db.String(200), nullable=False)
    state = db.Column(db.String(200), nullable=False)

    specialty = db.Column(db.String(100))
    phone = db.Column(db.String(50), nullable=False)

    patients = relationship("User", secondary=users_providers, back_populates='providers')
    appointments = relationship("Appointment", back_populates='provider')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'specialty': self.specialty,
            'phone': self.phone,
        }