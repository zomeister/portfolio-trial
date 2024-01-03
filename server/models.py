from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt

class User(db.Model, UserMixin, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    @validates('username')
    def validate_username(self, key, new_username):
        if not 3 <= len(new_username) <= 40:
            raise ValueError('len(username):[3,40]')
        return new_username
    @validates('email')
    def validate_name(self, key, new_email):
        if not 200 >= len(new_email) >= 4 and '@' in new_email and '.' in new_email:
            raise ValueError('len(email):[4,200], email must include @ and . characters')
        return new_email
    serialize_rules = ()
    def __repr__(self):
        return f"<User(name:{self.username}, email:{self.email})>"