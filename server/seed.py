from random import randint, choice as rc
from faker import Faker
from config import db, app
from models import User, Profile, Friendship

faker = Faker()

def delete_records():
    with app.app_context():
        User.query.delete()
        Profile.query.delete()
        # Friendship.query.delete()
        # Message.query.delete()
        db.session.commit()
        print("Records deleted")
        
def seed_users_and_profiles():
    with app.app_context():
            users = []
            profiles = []
            for i in range(10):
                users.append( User(
                    first_name=faker.first_name(),
                    last_name=faker.last_name(),
                    email=faker.email(),
                    password_hash='123456789a',
                ))
                profiles.append( Profile(
                    username=users[i].email,
                    bio=faker.paragraph(),
                    location=faker.city(),
                    photo_url=faker.image_url(),
                    # user_id=i+1
                )) 
            db.session.add_all(users + profiles)
            db.session.commit()
            return users, profiles
            
if __name__ == '__main__':
    with app.app_context():
        delete_records()
        print("seeding...")
        users, profiles = seed_users_and_profiles()