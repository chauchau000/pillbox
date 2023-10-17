from flask import Blueprint, jsonify, session, request
from app.models import Glucose, db, User
from app.forms import GlucoseForm
from flask_login import current_user, login_required
from app.api.auth_routes import validation_errors_to_error_messages


glucose_routes = Blueprint('glucose', __name__)


@glucose_routes.route('/', methods=['POST'])
def create_glucose():
    """
    Create new glucose reading for current user
    """
    user = User.query.get(current_user.id)
    form = GlucoseForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():

        new_glucose = Glucose(
            user_id=current_user.id,
            date=form.data['date'],
            time=form.data['time'],
            level=form.data['level'],
            notes=form.data['notes']
        )

        db.session.add(new_glucose)
        db.session.commit()
        return {'message': 'Glucose reading created successfully'}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@glucose_routes.route('/<int:glucose_id>', methods=['PUT', 'PATCH'])
@login_required
def edit_glucose(glucose_id):
    """
    Edit glucose reading by glucose reading id
    """
    user = User.query.get(current_user.id)
    form = GlucoseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    glucose = Glucose.query.get(glucose_id)

    if glucose: 
        if form.validate_on_submit():

            glucose.date = form.data['date']
            glucose.time = form.data['time']
            glucose.notes = form.data['notes']
            glucose.level = form.data['level']

            db.session.commit()
            return {'message': 'Glucose reading edited successfully'}
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    elif not glucose:
        return {'message': "Glucose reading not found"}




@glucose_routes.route('/<int:glucose_id>', methods=['DELETE'])
@login_required
def delete_glucose(glucose_id):
    """
    Delete an glucose reading by id
    """
    
    glucose = Glucose.query.get(glucose_id)

    if glucose:
        db.session.delete(glucose)
        db.session.commit()
        return {'message': 'Glucose deleted successfully'}
    elif not glucose:
        return {'message': "Glucose reading not found"}
        
    return {'error': 'Glucose unable to be deleted'}