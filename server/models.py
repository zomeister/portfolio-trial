from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt
from datetime import datetime

class Follow (db.Model, SerializerMixin):
    __tablename__ = "follows"
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    def __repr__(self):
        return "<Follow %d to %d>" % (self.follower_id, self.following_id)
    
    
class Message (db.Model, SerializerMixin):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    content = db.Column(db.String)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    def __repr__(self):
        return "<Message %d to %d: %s>" % (self.sender_id, self.receiver_id, self.content)
    
    
class Profile (db.Model, SerializerMixin):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    
    
    
    
class User(db.Model, UserMixin, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    
    username = db.Column(db.String, unique=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    telephone = db.Column(db.String)
    photo_url = db.Column(db.String)
    birthday = db.Column(db.String)
    location = db.Column(db.String)
    bio = db.Column(db.String)
    
    # blogs = db.relationship('Blog', back_populates='author', cascade='all, delete-orphan')
    # messages = db.relationship('Blog', back_populates='author', cascade='all, delete-orphan')
    
    messages_sent = db.relationship(
        'Message',
        foreign_keys=[Message.sender_id],
        backref='sender',
        lazy='dynamic'
    )
    
    messages_received = db.relationship(
        'Message',
        foreign_keys=[Message.receiver_id],
        backref='receiver',
        lazy='dynamic'
    )
    
    # following_list = db.relationship(
    #     'Follow',
    #     foreign_keys=[Follow.follower_id],
    #     backref=db.backref('follower_backref', lazy='join'),
    #     lazy='dynamic',
    #     cascade='all, delete-orphan'
    # )
    
    # follower_list = db.relationship(
    #     'Follow',
    #     foreign_keys=[Follow.following_id],
    #     backref=db.backref('following_backref', lazy='join'),
    #     lazy='dynamic',
    #     cascade='all, delete-orphan'
    # )
    
    
    
    @validates('first_name', 'last_name')
    def validate_name(self, key, new_name):
        if not 2 <= len(new_name) <= 28:
            raise ValueError('len(name):[2,28], first_name & last_name  must be an email including @ and . characters')
        return new_name
    @validates('username')
    def validate_username(self, key, new_username):
        if not 4 <= len(new_username) <= 160 and '@' in new_username and '.' in new_username:
            raise ValueError('len(username):[4,160], username must be an email including @ and . characters')
        return new_username
    
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

    
class Friendship (db.Model, SerializerMixin):
    __tablename__ = "friendships"
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    req_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    rec_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    status = db.Column(db.String)
    # messages = db.relationship("Message", backref="friendships", cascade="all, delete-orphan")

# class Blog (db.Model, SerializerMixin):
#     __tablename__ = "blogs"
#     id = db.Column(db.Integer, primary_key=True)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())
#     link_url = db.Column(db.String)
    
#     comments = db.relationship("Comment", backref="blog", cascade="all, delete-orphan")
    
# class Post (db.Model, SerializerMixin):
#     __tablename__ = "posts"
#     id = db.Column(db.Integer, primary_key=True)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())
#     content = db.Column(db.String)
    
# class Comment (db.Model, SerializerMixin):
#     __tablename__ = "comments"
#     id = db.Column(db.Integer, primary_key=True)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())
#     article_id = db.Column(db.Integer, db.ForeignKey('blogs.id'))
#     content = db.Column(db.String)