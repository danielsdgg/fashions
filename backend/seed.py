from faker import Faker
from models import session, User
# from random import randint
# from main import app

faker = Faker()
user = []

# with app.app_context():
for i in range(10):
        
        customer =User(
        email = faker.email(),
        password = faker.password(),
        
    )
        user.append(customer)
        session.bulk_save_objects(user)
        session.commit()