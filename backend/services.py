import fastapi as _fastapi
import fastapi.security as _security
import database as _database, models as _models, schemas as _schemas
import sqlalchemy.orm as _orm
import passlib.hash as _hash
import jwt as _jwt
import datetime as _dt
from typing import List
import jwt
from fastapi import Depends, HTTPException

oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/api/token/user")

oauth2schema2 = _security.OAuth2PasswordBearer(tokenUrl="/api/token/admin")


# oauth2schema2 = _security.OAuth2PasswordBearer(tokenUrl="/api/token/user")


# to generate a string like this run: openssl rand -hex 32
JWT_SECRET = "8fb8ca6364a55b73229510aec75ed060a0081a8b9fda8fd0cf9b2d78e1bbae14"

def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)

def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# function to get admin by email
async def get_admin_by_email(email:str, db: _orm.Session):
    return db.query(_models.Admin).filter(_models.Admin.email == email).first()

# create an admin
async def create_admin(admin: _schemas.AdminCreate, db: _orm.Session):
    use = _models.Admin(email=admin.email, hashed_password=_hash.bcrypt.hash(admin.hashed_password))
    db.add(use)
    db.commit()
    db.refresh(use)
    return _schemas.Admin.from_orm(use)

# function to get user by email
async def get_user_by_email(email:str, db: _orm.Session):
    return db.query(_models.User).filter(_models.User.email == email).first()

# create a user
async def create_user(user: _schemas.UserCreate, db: _orm.Session):
    user_obj = _models.User(
        email=user.email, hashed_password=_hash.bcrypt.hash(user.hashed_password))
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj

# function to authenticate an admin
async def authenticate_admin(email:str, password:str, db: _orm.Session):
    admin = await get_admin_by_email(db=db, email=email)

    if not admin:
        return False
    if not admin.verify_password(password):
        return False
    return admin

# function to authenticate user
async def authenticate_user(email:str, password:str, db: _orm.Session):
    user = await get_user_by_email(db=db, email=email)

    if not user:
        return False
    if not user.verify_password(password):
        return False
    return user

# function to create a token for admin
async def create_token_admin(admin: _models.Admin):
    admin_obj = _schemas.Admin.from_orm(admin)

    token = _jwt.encode(admin_obj.dict(), JWT_SECRET)

    return dict(access_token=token, token_type="bearer")

# function to create a token for user
async def create_token(user: _models.User):
    user_obj = _schemas.User.from_orm(user)

    token = _jwt.encode(user_obj.dict(), JWT_SECRET)

    return dict(access_token=token, token_type="bearer")

# function for getting an admin
async def get_current_admin(db: _orm.Session = _fastapi.Depends(get_db), token: str = _fastapi.Depends(oauth2schema2)):
    try:
        payload = _jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        admin = db.query(_models.Admin).get(payload["id"])
    except:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Email or Password")
    return _schemas.Admin.from_orm(admin)

# function for getting a user
async def get_current_user(db: _orm.Session = _fastapi.Depends(get_db), token: str = _fastapi.Depends(oauth2schema)):
    try:
        payload = _jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(_models.User).get(payload["id"])
    except:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Email or Password")
    return _schemas.User.from_orm(user)

# [Products]
# create product
async def create_product(user: _schemas.User, db: _orm.Session, prod: _schemas.ProductCreate):
    prod = _models.Products(**prod.dict(),user_id=user.id)
    db.add(prod)
    db.commit()
    db.refresh(prod)
    return _schemas.Products.from_orm(prod)

# function that gets all products
# Function to get all products, not filtered by user
async def get_products(db: _orm.Session):
    prods = db.query(_models.Products).all()  # No filtering by user_id
    return list(map(_schemas.Products.from_orm, prods))

# by user
# Function to get products by a specific user
async def get_products_by_user(user_id: int, db: _orm.Session):
    prods = db.query(_models.Products).filter_by(user_id=user_id).all()
    return list(map(_schemas.Products.from_orm, prods))



# product selector
async def _product_selector(prod_id:int, user: _schemas.User, db: _orm.Session):
    prod = (
        db.query(_models.Products)
        .filter_by(user_id=user.id)
        .filter(_models.Products.id == prod_id)
        .first()
    )
    if prod is None:
        raise _fastapi.HTTPException(status_code=404, detail="Product does not exist")
    return prod

# function that gets one product
async def get_product(prod_id: int, user: _schemas.User, db: _orm.Session):
    prod = await _product_selector(prod_id=prod_id, user=user, db=db)

    return _schemas.Products.from_orm(prod)

# function that deletes a product
async def delete_product(prod_id: int, user: _schemas.User, db: _orm.Session):
    prod = await _product_selector(prod_id, user, db)

    db.delete(prod)
    db.commit()

# function that updates a product
async def update_product(prod_id: int, prod: _schemas.ProductCreate, user: _schemas.User, db: _orm.Session):
    prod_db = await _product_selector(prod_id, user, db)

    prod_db.name = prod.name
    prod_db.description = prod.description
    prod_db.image = prod.image
    prod_db.price = prod.price
    prod_db.date_last_updated = _dt.datetime.utcnow()
    db.commit()
    db.refresh(prod_db)
    return _schemas.Products.from_orm(prod_db)

# [Cart]
# create cart
async def create_cart(user: _schemas.User, db: _orm.Session, cart: _schemas.CartCreate):
    cart = _models.Cart(**cart.dict(),user_id=user.id)
    db.add(cart)
    db.commit()
    db.refresh(cart)
    return _schemas.Cart.from_orm(cart)

# function that gets all carts
async def get_carts(user: _schemas.User, db: _orm.Session):
    carts = db.query(_models.Cart).filter_by(user_id=user.id)
    # mapping saves from writing a 4-loop where we have to go through each lead
    return list(map(_schemas.Cart.from_orm, carts))

# cart selector
async def _cart_selector(cart_id:int, user: _schemas.User, db: _orm.Session):
    cart = (
        db.query(_models.Cart)
        .filter_by(user_id=user.id)
        .filter(_models.Cart.id == cart_id)
        .first()
    )
    if cart is None:
        raise _fastapi.HTTPException(status_code=404, detail="Cart does not exist")
    return cart

# function that gets one cart
async def get_cart(cart_id: int, user: _schemas.User, db: _orm.Session):
    cart = await _cart_selector(cart_id=cart_id, user=user, db=db)

    return _schemas.Cart.from_orm(cart)

# function that deletes a cart
async def delete_cart(cart_id: int, user: _schemas.User, db: _orm.Session):
    cart = await _cart_selector(cart_id, user, db)

    db.delete(cart)
    db.commit()

# function that updates a cart
async def update_cart(cart_id: int, prod: _schemas.CartCreate, user: _schemas.User, db: _orm.Session):
    cart_db = await _cart_selector(cart_id, user, db)

    cart_db.name = prod.name
    cart_db.description = prod.description
    cart_db.image = prod.image
    cart_db.price = prod.price
    cart_db.quantity = prod.quantity
    cart_db.total_price = prod.total_price

    db.commit()
    db.refresh(cart_db)
    return _schemas.Cart.from_orm(cart_db)
