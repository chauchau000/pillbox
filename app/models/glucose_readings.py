from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Glucose(db.Model):
    __tablename__ = 'glucose_levels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.String(1000))

    user = relationship("User", back_populates='glucose_readings')

    def to_dict(self):
        return {
            'id': self.id,
            'level': self.level,
            'date': self.date,
            'time': self.time,
            'notes': self.notes
        }