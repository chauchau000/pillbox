from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length



class ProviderForm(FlaskForm):
    name = StringField(
        'name', validators=[DataRequired()])
    address = StringField(
        'address', validators=[DataRequired()])
    specialty = StringField(
        'specialty', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired(), Length(10, 10, "Phone number must be 10 digits")])
