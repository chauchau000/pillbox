from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User_Med, Med, db
from app.api.auth_routes import validation_errors_to_error_messages

med_routes = Blueprint('meds', __name__)

#user will not be able to add, edit, or delete stock meds
@med_routes.route('/')
def meds():
    """
    Query for all meds and returns them in a list of med dictionaries
    """
    meds = Med.query.all()
    return [med.to_dict() for med in meds]

