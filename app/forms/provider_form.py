from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length



class ProviderForm(FlaskForm):
    name = StringField(
        'name', validators=[DataRequired()])
    address = StringField(
        'address', validators=[DataRequired()])
    city = StringField(
        'city', validators=[DataRequired()])
    state = StringField(
        'state', validators=[DataRequired()])
    specialty = StringField(
        'specialty', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired()])
