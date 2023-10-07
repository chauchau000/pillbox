from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired


class UserMedForm(FlaskForm):
    directions = StringField(
        'directions', validators=[DataRequired()])
    indication = StringField(
        'indication', validators=[DataRequired()])
    isActive = BooleanField(
        'isActive', validators=[DataRequired()])
    strength = StringField(
        'strength', validators=[DataRequired()]
    )
