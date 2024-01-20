from random import randint, choice as rc
from faker import Faker
from config import db, app
from models import Follow, Message, User, Profile

faker = Faker()

def delete_records():
    with app.app_context():
        Profile.query.delete()
        Follow.query.delete()
        Message.query.delete()
        User.query.delete()
        db.session.commit()
        print("Records deleted")
        
def seed_users():
    with app.app_context():
            users = []
            emails = [faker.email() for _ in range(10)]
            for i in range(10):
                users.append( User(
                    email=emails[i],
                    password_hash='123a',
                    username=emails[i],
                    first_name=faker.first_name(),
                    last_name=faker.last_name(),
                ))
            db.session.add_all(users)
            db.session.commit()
            return users
def seed_follows(users):
    with app.app_context():
            follows = []
            for i in range(10):
                follows.append( Follow (
                    
                ))
            db.session.add_all(follows)
            db.session.commit()
            return follows
            
if __name__ == '__main__':
    with app.app_context():
        delete_records()
        print("seeding...")
        users= seed_users()
        follows= seed_follows(users)