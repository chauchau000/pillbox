from .db import db, environment, SCHEMA, add_prefix_for_prod


users_providers = db.Table(
    "users_providers", 
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('provider_id', db.Integer, db.ForeignKey(add_prefix_for_prod('providers.id')), primary_key=True)
)

if environment == "production":
    users_providers.schema = SCHEMA