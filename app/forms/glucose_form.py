from flask_wtf import FlaskForm
from wtforms import DateField, TimeField, IntegerField, StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class GlucoseForm(FlaskForm):
    level = IntegerField(
        'level', validators=[DataRequired()])
    date = DateField(
        'date', validators=[DataRequired()])
    time = TimeField(
        'time', validators=[DataRequired()])
    notes = StringField(
        'notes'
    )
