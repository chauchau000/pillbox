from .db import db, environment, SCHEMA, add_prefix_for_prod


class Med(db.Model):
    __tablename__ = 'meds'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    strengths = db.Column(db.String(200))
    side_effects = db.Column(db.String(1000))

    def to_dict(self):
        side_effects = self.side_effects.split(', ')
        strengths = self.strengths.split(', ')
        return {
            'id': self.id,
            'name': self.name,
            'strengths': strengths,
            'side_effects': side_effects
        }

