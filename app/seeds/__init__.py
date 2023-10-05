from flask.cli import AppGroup
from .users import seed_users, undo_users
from .meds import seed_meds, undo_meds
from .providers import seed_providers, undo_providers
from .user_meds import seed_user_meds, undo_user_meds
from .appointments import seed_appointments, undo_appointments
from .glucose import seed_glucose, undo_glucose

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        udno_glucose()
        undo_appointments()
        undo_user_meds()
        undo_providers()
        undo_meds()
        undo_users()
    seed_users()
    seed_providers()
    seed_meds()
    seed_user_meds()
    seed_appointments()
    seed_glucose()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    udno_glucose()
    undo_appointments()
    undo_user_meds()
    undo_providers()
    undo_meds()
    undo_users()
    # Add other undo functions here