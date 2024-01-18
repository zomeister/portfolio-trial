from random import randint, choice as rc
from faker import Faker
from config import db, app
from models import User

faker = Faker()

def delete_records():
    with app.app_context():
        User.query.delete()
        db.session.commit()
        print("Records deleted")
        
def seed_users():
    with app.app_context():
            users = []
            for _ in range(10):
                users.append( User(
                    first_name=faker.first_name(),
                    last_name=faker.last_name(),
                    username=faker.email(),
                    bio=faker.paragraph(),
                    location=faker.city(),
                    photo_url=faker.image_url(),
                    password_hash='123456789a',
                ))
            db.session.add_all(users)
            db.session.commit()
            return users
            
if __name__ == '__main__':
    with app.app_context():
        delete_records()
        print("seeding...")
        users= seed_users()