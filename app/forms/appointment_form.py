from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TimeField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class AppointmentForm(FlaskForm):
    date = DateField(
        'date', validators=[DataRequired()])
    time = TimeField(
        'time', validators=[DataRequired()])
