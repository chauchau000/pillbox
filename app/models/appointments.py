from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Appointment(db.Model):
    __tablename__ = 'appointments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('providers.id')), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)

    user = relationship("User", back_populates='appointments')
    provider = relationship("Provider")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'provider': self.provider.to_dict(),
            'date': self.date,
            'time': self.time
        }