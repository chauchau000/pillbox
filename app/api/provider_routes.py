from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Provider, db
from app.forms import ProviderForm
from app.api.auth_routes import validation_errors_to_error_messages

provider_routes = Blueprint('providers', __name__)



@provider_routes.route('/')
def providers():
    """
    Query for all providers and returns them in a list of provider dictionaries
    """
    providers = Provider.query.all()
    return [provider.to_dict() for provider in providers]


@provider_routes.route('/<int:id>')
@login_required
def provider(id):
    """
    Query for a provider by id and returns that provider in a dictionary
    """
    provider = Provider.query.get(id)
    return provider.to_dict()


@provider_routes.route('/', methods=['POST'])
@login_required
def new_provider():
    """
    Creates a new provider
    """
    form = ProviderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newphone = ''.join(form.data['phone'].split('-'))

        provider = Provider(
            name=form.data['name'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            specialty=form.data['specialty'],
            phone=newphone
        )
        db.session.add(provider)
        db.session.commit()
        return provider.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@provider_routes.route('/<int:id>', methods=['PUT', 'PATCH'])
@login_required
def edit_provider(id):
    """
    Edits a provider
    """

    form = ProviderForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        provider = Provider.query.get(id)

        if not provider:
            return {'message': 'Provider not found'}
        else: 
            
            provider.name=form.data['name']
            provider.address=form.data['address']
            provider.specialty=form.data['specialty']
            provider.phone=form.data['phone']
            provider.fax=form.data['fax']
            
            db.session.commit()
            return provider.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


