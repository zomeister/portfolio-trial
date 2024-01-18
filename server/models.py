from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt

class User(db.Model, UserMixin, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    
    
    
    
    
    @validates('first_name', 'last_name')
    def validate_name(self, key, new_name):
        if not 2 <= len(new_name) <= 28:
            raise ValueError('len(name):[2,28], first_name & last_name  must be an email including @ and . characters')
        return new_name
    @validates('email')
    def validate_username(self, key, new_email):
        if not 4 <= len(new_username) <= 160 and '@' in new_username and '.' in new_username:
            raise ValueError('len(username):[4,160], username must be an email including @ and . characters')
        return new_username
    
    
    
    
    bio = db.Column(db.String)
    location = db.Column(db.String)
    photo_url = db.Column(db.String)
    
    serialize_rules = ()
    
    def __repr__(self):
        return f"<User(name:{self.first_name} {self.last_name}, email:{self.username})>"
    # def __repr__(self):
    #     return f"<User(name:{self.first_name} {self.last_name}, email:{self.username})>"
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    # @validates('username')
    # def validate_username(self, key, new_username):
    #     if not 3 <= len(new_username) <= 40:
    #         raise ValueError('len(username):[3,40]')
    #     return new_username
    @validates('username')
    def validate_username(self, key, new_username):
        if not 4 <= len(new_username) <= 160 and '@' in new_username and '.' in new_username:
            raise ValueError('len(username):[4,160], username must be an email including @ and . characters')
        return new_username


class Profile (db.Model, SerializerMixin):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    bio = db.Column(db.String)
    location = db.Column(db.String)
    photo_url = db.Column(db.String)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    serialize_rules = ()
    
    # messages = db.relationship("Message", backref="profile", lazy="dynamic")
    def __repr__(self):
        return f"<Profile(username:{self.username}, bio:{self.bio}, location:{self.location}, photo_url:{self.photo_url})>"
    
class Friendship (db.Model, SerializerMixin):
    __tablename__ = "friendships"
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    req_user_id = db.Column(db.Integer, db.ForeignKey('profiles.id'))
    rec_user_id = db.Column(db.Integer, db.ForeignKey('profiles.id'))
    status = db.Column(db.String)
    # messages = db.relationship("Message", backref="friendships", cascade="all, delete-orphan")

# class Message (db.Model, SerializerMixin):
#     __tablename__ = "messages"
#     id = db.Column(db.Integer, primary_key=True)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())
#     friendship_id = db.Column(db.Integer, db.ForeignKey('friendships.id'))
#     profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'))
#     profile = db.relationship('Profile', back_populates="messages", lazy="joined")
#     content = db.Column(db.String)