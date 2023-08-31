from fastapi import FastAPI
from pydantic import BaseModel
from models import session, Superadmin, Admin, User, Profile, Products, Cart, Images, Reviews, Sales, Orders
from typing import List, Optional

app = FastAPI()

# creating pydantic classes for the models
class SuperadminSchema(BaseModel):
    id:int
    email:str
    password:str

class AdminSchema(BaseModel):
    id:int
    email:str
    password:str

class UserSchema(BaseModel):
    id:int
    email:str
    password:str





# @app.route('/')
# def getAll():
#     return session.query().all()