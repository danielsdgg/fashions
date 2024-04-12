import fastapi as _fastapi
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import fastapi.security as _security
import sqlalchemy.orm as _orm
import services as _services, schemas as _schemas, models as _models
import uvicorn
from fastapi import HTTPException, Depends

app = _fastapi.FastAPI()

oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/api/token/user")


app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials = True,
    allow_methods = ["GET", "POST", "PUT", "DELETE"],
    allow_headers = ["*"],
)

#Home
@app.get("/api", tags=["Home"])
def root():
    return {"message": "Welcome to Hero-Clothline!"}

@app.get('/api/users', tags=["Admin Operations"], response_model=List[_schemas.User])
async def get_all_users(admin: _schemas.Admin = _fastapi.Depends(_services.get_current_admin), db: _orm.Session = _fastapi.Depends(_services.get_db)):
    users = db.query(_models.User).all()
    return list(map(_schemas.User.from_orm, users))


# create admin
@app.post('/api/admins', tags=["Credentials"])
async def create_admin(admin: _schemas.AdminCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    db_adm = await _services.get_admin_by_email(admin.email, db)
    if db_adm:
        raise _fastapi.HTTPException(status_code=400, detail="Email already in use")
    admin = await _services.create_admin(admin, db)
    return await _services.create_token_admin(admin)

# create user
@app.post('/api/users', tags=["Credentials"])
async def create_user(user: _schemas.UserCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    db_user = await _services.get_user_by_email(user.email, db)
    if db_user:
        raise _fastapi.HTTPException(status_code=400, detail="Email already in use")
    user = await _services.create_user(user, db)
    return await _services.create_token(user)

# token for admin
@app.post('/api/token/admin', tags=["Credentials"])
async def generate_token(
    form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(),
    db: _orm.Session = _fastapi.Depends(_services.get_db),):
     adm = await _services.authenticate_admin(form_data.username, form_data.password, db)

     if not adm:
         raise _fastapi.HTTPException(status_code=401, detail="Invalid Credentials")
     
     return await _services.create_token(adm)

# token for user
@app.post('/api/token/user', tags=["Credentials"])
async def generate_token(
    form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(),
    db: _orm.Session = _fastapi.Depends(_services.get_db),):
     user = await _services.authenticate_user(form_data.username, form_data.password, db)

     if not user:
         raise _fastapi.HTTPException(status_code=401, detail="Invalid Credentials")
     
     return await _services.create_token(user)

# get admin
@app.get('/api/admin/me', tags=["operator"], response_model=_schemas.Admin)
async def get_admin(admi: _schemas.Admin = _fastapi.Depends(_services.get_current_admin)):
    return admi

# get user
@app.get('/api/users/me', tags=["operator"], response_model=_schemas.User)
async def get_user(user: _schemas.User = _fastapi.Depends(_services.get_current_user)):
    return user

# [Products]
# return all products
@app.get('/products', tags=["GET ALL"], response_model=List[_schemas.Products])
async def get_all_products(db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.get_products(db=db)

# New endpoint to fetch products by a specific user
@app.get('/products/by-user/{user_id}', tags=["GET BY USER"], response_model=List[_schemas.Products])
async def get_products_by_user(user_id: int, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.get_products_by_user(user_id=user_id, db=db)

# retutn a single product
@app.get('/products/{prod_id}', tags=["GET ONE"], status_code=200)
async def get_product(prod_id: int, user: _schemas.User=_fastapi.Depends(_services.get_current_user), db: _orm.Session=_fastapi.Depends(_services.get_db)):
    return await _services.get_product(prod_id, user, db)

# create product
@app.post('/products', tags=["POST"], response_model=_schemas.Products)
async def create_product(prod: _schemas.ProductCreate, user: _schemas.User=_fastapi.Depends(_services.get_current_user), db: _orm.Session=_fastapi.Depends(_services.get_db)):
    return await _services.create_product(user=user, db=db, prod=prod)

# delete a product
@app.delete('/products/{prod_id}', tags=["DELETE"], status_code=204)
async def delete_product(prod_id: int, user: _schemas.User=_fastapi.Depends(_services.get_current_user), db: _orm.Session=_fastapi.Depends(_services.get_db)):
    await _services.delete_product(prod_id, user, db)
    return {"message", "Successfully deleted"}

# edit/update a product
@app.put('/products/{prod_id}', tags=["PUT"], status_code=200)
async def update_product(prod_id: int, prod: _schemas.ProductCreate, user: _schemas.User=_fastapi.Depends(_services.get_current_user), db: _orm.Session=_fastapi.Depends(_services.get_db)):
    await _services.update_product(prod_id, prod, user, db)
    return {"message": "Successfully updated"}

# [Cart]
# return all carts
@app.get('/cart', tags=["GET ALL"], response_model=List[_schemas.Cart])
async def get_carts(user: _schemas.User=_fastapi.Depends(_services.get_current_user), db: _orm.Session=_fastapi.Depends(_services.get_db)):
    return await _services.get_carts(user=user, db=db)

# retutn a single cart
@app.get('/cart/{cart_id}', tags=["GET ONE"], status_code=200)
async def get_cart(cart_id: int, user: _schemas.User=_fastapi.Depends(_services.get_current_user), db: _orm.Session=_fastapi.Depends(_services.get_db)):
    return await _services.get_cart(cart_id, user, db)

# create cart
@app.post('/cart', tags=["POST"], response_model=_schemas.Cart)
async def create_cart(cart: _schemas.CartCreate, user: _schemas.User=_fastapi.Depends(_services.get_current_user), db: _orm.Session=_fastapi.Depends(_services.get_db)):
    return await _services.create_cart(user=user, db=db, cart=cart)

# delete a cart
@app.delete('/cart/{cart_id}', tags=["DELETE"], status_code=204)
async def delete_cart(cart_id: int, user: _schemas.User=_fastapi.Depends(_services.get_current_user), db: _orm.Session=_fastapi.Depends(_services.get_db)):
    await _services.delete_cart(cart_id, user, db)
    return {"message", "Successfully deleted"}

# edit/update a cart
@app.put('/cart/{cart_id}', tags=["PUT"], status_code=200)
async def update_cart(cart_id: int, prod: _schemas.CartCreate, user: _schemas.User=_fastapi.Depends(_services.get_current_user), db: _orm.Session=_fastapi.Depends(_services.get_db)):
    await _services.update_cart(cart_id, prod, user, db)
    return {"message": "Successfully updated"}







#Product
# @app.post('/add_product', tags=["Post"])
# async def add_product(pdc: _schemas.Products):
#     product = pdc.dict()
#     new_product = _schemas.Products(name=product["name"], description=product["description"], image=product["image"], price=product["price"])
#     print(new_product)
#     images = product["images"][0]
#     new_images = _schemas.Images(image1=images["image1"], image2=images["image2"], image3=images["image3"])
#     print(new_images)
#     print(product)
#     new_product.images.append(new_images)
#     db.add(new_product)
#     db.commit()
#     return "product"

    
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000) 