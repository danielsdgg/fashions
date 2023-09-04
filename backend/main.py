from fastapi import FastAPI
from pydantic import BaseModel
from models import session, Superadmin, Admin, User, Products, Cart, Images, Reviews, Sales, Orders
from typing import List, Optional

app = FastAPI()

# creating pydantic classes for the models
class SuperadminSchema(BaseModel):
    id:int
    email:str
    password:str

    class Config:
        orm_mode = True

class UpdateSuperadminSchema(BaseModel):
    id:Optional[int] = None
    email:Optional[str] = None
    password:Optional[str] = None

    class Config:
        orm_mode = True

class AdminSchema(BaseModel):
    id:int
    email:str
    password:str

    class Config:
        orm_mode = True

class UpdateAdminSchema(BaseModel):
    id:Optional[int] = None
    email:Optional[str] = None
    password:Optional[str] = None

    class Config:
        orm_mode = True

class UserSchema(BaseModel):
    id:int
    email:str
    password:str
    fname:str
    lname:str
    gender:str
    contacts:str
    profilepicture:str

    class Config:
        orm_mode = True

class UpdateUserSchema(BaseModel):
    id:Optional[int] = None
    email:Optional[str] = None
    password:Optional[str] = None
    fname:Optional[str] = None
    lname:Optional[str] = None
    gender:Optional[str] = None
    contacts:Optional[int] = None
    profilepicture:Optional[str] = None

    class Config:
        orm_mode = True

class ProductsSchema(BaseModel):
    id:int
    name:str
    description:str
    Image:str
    price:int

    class Config:
        orm_mode = True

class UpdateProductsSchema(BaseModel):
    id:Optional[int] = None
    name:Optional[str] = None
    description:Optional[str] = None
    image:Optional[str] = None
    price:Optional[int] = None

    class Config:
        orm_mode = True

class ImagesSchema(BaseModel):
    id:int
    image1:str
    image2:str
    image3:str

    class Config:
        orm_mode = True

class UpdateImagesSchema(BaseModel):
    id:Optional[int] = None
    image1:Optional[str] = None
    image2:Optional[str] = None
    image3:Optional[str] = None

    class Config:
        orm_mode = True

class CartSchema(BaseModel):
    id:int

    class Config:
        orm_mode = True

class UpdateCartSchema(BaseModel):
    id:Optional[int] = None

    class Config:
        orm_mode = True

class SalesSchema(BaseModel):
    id:int

    class Config:
        orm_mode = True

class UpdateSalesSchema(BaseModel):
    id:Optional[int] = None

    class Config:
        orm_mode = True

class ReviewsSchema(BaseModel):
    id:int
    comments:str
    ratings:str

    class Config:
        orm_mode = True

class UpdateReviewsSchema(BaseModel):
    id:Optional[int] = None
    comments:Optional[str] = None
    ratings:Optional[str] = None

    class Config:
        orm_mode = True

class OrdersSchema(BaseModel):
    id:int
    fee:int
    date:int

    class Config:
        orm_mode = True

class UpdateOrdersSchema(BaseModel):
    id:Optional[int] = None
    fee:Optional[int] = None
    date:Optional[int] = None

    class Config:
        orm_mode = True

@app.get("/")
def root():
    return {"message": "Welcome User!"}


# creating a component that returns all superadmins
@app.get("/superadmin")
def get_all_supers():
    superadmin = session.query(Superadmin).all()
    return {"superadmins":superadmin}

# creating a component that returns all admins
@app.get('/admin')
def get_all_admins() -> List[AdminSchema]:
    adm = session.query(Admin).all()
    return adm

# creating a component that returns all users
@app.get('/users')
def get_all_users() -> List[UserSchema]:
    client = session.query(User).all()
    return client

# creating a component that returns all products
@app.get('/products')
def get_all_products() -> List[ProductsSchema]:
    stuff = session.query(Products).all()
    return stuff

# creating a component that returns all images
@app.get('/images')
def get_all_images() -> List[ImagesSchema]:
    img = session.query(Images).all()
    return img

# creating a component that returns all reviews
@app.get('/reviews')
def get_all_reviews() -> List[ReviewsSchema]:
    rev = session.query(Reviews).all()
    return rev

# creating a component that returns all sales
@app.get('/sales')
def get_all_sales() -> List[SalesSchema]:
    sell = session.query(Sales).all()
    return sell

# creating a component that returns all cart
@app.get('/carts')
def get_all_carts() -> List[CartSchema]:
    buy = session.query(Cart).all()
    return buy

# creating a component that returns all orders
@app.get('/orders')
def get_all_orders() -> List[OrdersSchema]:
    ord = session.query(Orders).all()
    return ord












# @app.route('/')
# def getAll():
#     return session.query().all()