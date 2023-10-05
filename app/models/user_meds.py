from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship

class User_Med(db.Model):
    __tablename__ = 'user_meds'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    med_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('meds.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('providers.id')), nullable=False)
    strength = db.Column(db.String(50))
    directions = db.Column(db.String(200), nullable=False)
    indication = db.Column(db.String(200), nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    
    user = relationship("User", back_populates='user_meds')
    med = relationship("Med", back_populates='users')
    provider = relationship("Provider")

    def to_dict(self):
        return {
            'id': self.id,
            'medication': self.med.to_dict(),
            'provider_id': self.provider.to_dict(),
            'strength': self.strength,
            'directions': self.directions,
            'indication': self.indication,
            'active': self.active
        }