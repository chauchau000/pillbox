from flask import Blueprint, jsonify, session, request
from app.models import Appointment, db, User
from app.forms import AppointmentForm
from flask_login import current_user, login_required
from app.api.auth_routes import validation_errors_to_error_messages
import datetime

appointments_routes = Blueprint('appointments', __name__)


@appointments_routes.route('/<int:provider_id>', methods=['POST'])
def create_appointment(provider_id):
    """
    Create new appointment for current user
    """
    user = User.query.get(current_user.id)
    form = AppointmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():

        new_appointment = Appointment(
            user_id=current_user.id,
            provider_id=provider_id,
            date=form.data['date'],
            time=form.data['time'],
        )

        db.session.add(new_appointment)
        db.session.commit()
        return user.my_appointments()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@appointments_routes.route('/<int:appointment_id>', methods=['PUT', 'PATCH'])
@login_required
def edit_appointment(appointment_id):
    """
    Edit appointment for current user
    """
    user = User.query.get(current_user.id)
    form = AppointmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        appointment = Appointment.query.get(appointment_id)
        appointment.date = form.data['date']
        appointment.time = form.data['time']

        db.session.commit()
        return user.my_appointments()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@appointments_routes.route('/<int:appointment_id>', methods=['DELETE'])
@login_required
def delete_appointment(appointment_id):
    """
    Delete an appointment by appointment_id
    """
    
    appointment = Appointment.query.get(appointment_id)

    if appointment:
        db.session.delete(appointment)
        db.session.commit()
        return {'message': 'Appointment deleted successfully'}

    return {'error': 'appointment unable to be deleted'}