from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, User_Med, Provider
from app.forms import UserMedForm
from app.api.auth_routes import validation_errors_to_error_messages


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/providers')
@login_required
def user_providers():
    """
    Query for current user's providers
    """
    user = User.query.get(current_user.id)
    return user.my_providers()


@user_routes.route('/meds')
@login_required
def user_meds():
    """
    Query for current user's meds
    """
    user = User.query.get(current_user.id)
    return user.my_meds()


@user_routes.route('/appointments')
@login_required
def user_appointments():
    """
    Query for current user's appointments
    """
    user = User.query.get(current_user.id)
    return user.my_appointments()


@user_routes.route('/glucose')
@login_required
def user_glucose():
    """
    Query for current user's glucose readings
    """
    user = User.query.get(current_user.id)
    return user.my_glucose()


@user_routes.route('/meds/<int:med_id>/<int:provider_id>', methods=['POST'])
@login_required
def add_user_med(med_id, provider_id):
    """
    Add a med to current user's med list
    """
    form = UserMedForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.get(current_user.id)
        med_list = user.my_meds()
        for med in med_list:
            if med['medication']['id'] == med_id:
                return {'message': 'You are already on this medication, please edit your medication if your medication strength or direction has changed'}
        
        new_med = User_Med(
            med_id=med_id,
            user_id=current_user.id,
            provider_id=provider_id,
            strength=form.data['strength'],
            directions=form.data['directions'],
            indication=form.data['indication'],
            active=form.data['isActive']
        )

        db.session.add(new_med)
        db.session.commit()
        return user.my_meds()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/meds/<int:user_med_id>', methods=['PUT', 'PATCH'])
@login_required
def edit_user_med(user_med_id):
    """
    Edit a user's med
    """
    form = UserMedForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        med = User_Med.query.get(user_med_id)

        if not med:
            return {'message': 'Med not found'}
        elif med.user_id != current_user.id:
            return {'message': "Not authorized to delete other user's med"}

        med.strength=form.data['strength']
        med.directions=form.data['directions']
        med.indication=form.data['indication']
        med.active=form.data['isActive']
        
        db.session.commit()
        return med.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/meds/<int:user_med_id>/active', methods=['PUT', 'PATCH'])
@login_required
def flip_active(user_med_id):
    """
    Flip a user's med as active or inactive
    """

    med = User_Med.query.get(user_med_id)

    if not med:
        return {'message': 'Med not found'}
    elif med.user_id != current_user.id:
        return {'message': "Not authorized to delete other user's med"}

    isActive = med.active
    med.active = not isActive
    
    db.session.commit()
    return med.to_dict()
    


@user_routes.route('/meds/<int:user_med_id>', methods=['DELETE'])
@login_required
def delete_user_med(user_med_id):
    """
    Delete a user's med
    """

    user_med = User_Med.query.get(user_med_id)

    if not user_med:
        return {'message': 'Med not found'}
    elif user_med.user_id != current_user.id:
        return {'message': "Not authorized to delete other user's med"}
    
    db.session.delete(user_med)
    db.session.commit()
    return {'message': 'Successfuly deleted'}


@user_routes.route('/provider/<int:provider_id>', methods=['POST'])
@login_required
def add_user_provider(provider_id):
    """
    Add a provider a user's provider list
    """
    new_provider = Provider.query.get(provider_id)
    user = User.query.get(current_user.id)
    provider_list = user.my_providers()
    
    for provider in provider_list:
        if provider['id'] == provider_id:
            return {'message': 'You already have this provider in your provider list'}

    user.providers.append(new_provider)
    db.session.commit()


    return user.my_providers()
        