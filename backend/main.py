from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from models import session, Superadmin, Admin, User, Products, Images, Reviews, Sales, Orders
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
# import requests
# from requests.auth import HTTPBasicAuth

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

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
    contacts:int
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
    image:str
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


#GET ALL REQUESTS
@app.get("/", tags=["Home"])
def root():
    return {"message": "Welcome to the Homepage!"}

# GET all requests
# creating a component that returns all superadmins
@app.get("/superadmin", tags=["Get All"])
def get_all_supers():
    superadmin = session.query(Superadmin).all()
    return superadmin

# creating a component that returns all admins
@app.get('/admin', tags=["Get All"])
def get_all_admins() -> List[AdminSchema]:
    adm = session.query(Admin).all()
    return adm

# creating a component that returns all users
@app.get('/users', tags=["Get All"])
def get_all_users() -> List[UserSchema]:
    clt = session.query(User).all()
    return clt

# creating a component that returns all products
@app.get('/products', tags=["Get All"])
def get_all_products() -> List[ProductsSchema]:
    stuff = session.query(Products).all()
    return stuff

# creating a component that returns all images
@app.get('/images', tags=["Get All"])
def get_all_images() -> List[ImagesSchema]:
    img = session.query(Images).all()
    return img

# creating a component that returns all reviews
@app.get('/reviews', tags=["Get All"])
def get_all_reviews() -> List[ReviewsSchema]:
    rev = session.query(Reviews).all()
    return rev

# creating a component that returns all sales
@app.get('/sales', tags=["Get All"])
def get_all_sales() -> List[SalesSchema]:
    sell = session.query(Sales).all()
    return sell

# creating a component that returns all orders
@app.get('/orders', tags=["Get All"])
def get_all_orders() -> List[OrdersSchema]:
    ord = session.query(Orders).all()
    return ord

#GET ONE REQUESTS
# creating a component that returns a single superadmin
@app.get('/superadmin/{id}', tags=["Get One"], response_model=SuperadminSchema)
def one_superadmin(id: int):
    supers = session.query(Superadmin).filter_by(id=id).first()
    if supers is None:
        raise HTTPException(status_code=404, detail="Superadmin does not exist")
    return supers

# creating a component that returns a single admin
@app.get('/admin/{id}', tags=["Get One"], response_model=AdminSchema)
def one_admin(id: int):
    admns = session.query(Admin).filter_by(id=id).first()
    if admns is None:
        raise HTTPException(status_code=404, detail="Admin does not exist")
    return admns

# creating a component that returns a single user
@app.get('/user/{id}', tags=["Get One"], response_model=UserSchema)
def one_user(id: int):
    customer = session.query(User).filter_by(id=id).first()
    if customer is None:
        raise HTTPException(status_code=404, detail="User does not exist")
    return customer

# creating a component that returns a single product
@app.get('/product/{id}', tags=["Get One"], response_model=ProductsSchema)
def one_product(id: int):
    prod = session.query(Products).filter_by(id=id).first()
    if prod is None:
        raise HTTPException(status_code=404, detail="Product does not exist")
    return prod

# creating a component that returns a single image
@app.get('/image/{id}', tags=["Get One"], response_model=ImagesSchema)
def one_image(id: int):
    img = session.query(Images).filter_by(id=id).first()
    if img is None:
        raise HTTPException(status_code=404, detail="Image does not exist")
    return img

# creating a component that returns a single review
@app.get('/review/{id}', tags=["Get One"], response_model=ReviewsSchema)
def one_review(id: int):
    rev = session.query(Reviews).filter_by(id=id).first()
    if rev is None:
        raise HTTPException(status_code=404, detail="Review does not exist")
    return rev

# creating a component that returns a single sale
@app.get('/sale/{id}', tags=["Get One"], response_model=SalesSchema)
def one_sale(id: int):
    sale = session.query(Sales).filter_by(id=id).first()
    if sale is None:
        raise HTTPException(status_code=404, detail="sale does not exist")
    return sale

# creating a component that returns a single order
@app.get('/order/{id}', tags=["Get One"], response_model=OrdersSchema)
def one_order(id: int):
    ord = session.query(Orders).filter_by(id=id).first()
    if ord is None:
        raise HTTPException(status_code=404, detail="Order does not exist")
    return ord

# ALL POST REQUESTS
# creating a component that adds a new superadmin and their details to our list
@app.post('/add_superadmin', tags=["Post"])
def add_superadmin(sup: SuperadminSchema):
    sadm = Superadmin(**dict(sup))
    session.add(sadm)
    session.commit()
    return sup

# creating a component that adds a new admin and their details to our list
@app.post('/add_admin', tags=["Post"])
def add_admin(adm: AdminSchema):
    admi = Admin(**dict(adm))
    session.add(admi)
    session.commit()
    return adm

# creating a component that adds a new user and their details to our list
@app.post('/add_user', tags=["Post"])
def add_user(client: UserSchema):
    use = User(**dict(client))
    session.add(use)
    session.commit()
    return client

# creating a component that adds a new product and their details to our list
@app.post('/add_product', tags=["Post"])
def add_product(pdc: ProductsSchema):
    goods = Products(**dict(pdc))
    session.add(goods)
    session.commit()
    return pdc

# creating a component that adds a new image and their details to our list
@app.post('/add_image', tags=["Post"])
def add_image(img: ImagesSchema):
    pic = Images(**dict(img))
    session.add(pic)
    session.commit()
    return img

# creating a component that adds a new review and their details to our list
@app.post('/add_review', tags=["Post"])
def add_review(rev: ReviewsSchema):
    news = Reviews(**dict(rev))
    session.add(news)
    session.commit()
    return rev

# creating a component that adds a new sale and their details to our list
@app.post('/add_sale', tags=["Post"])
def add_sale(buy: SalesSchema):
    sell = Sales(**dict(buy))
    session.add(sell)
    session.commit()
    return buy


# creating a component that adds a new order and their details to our list
@app.post('/add_order', tags=["Post"])
def add_order(book: OrdersSchema):
    ordr = Orders(**dict(book))
    session.add(ordr)
    session.commit()
    return book

# All PATCH requests
# creating a component that edits specific details of a superadmin
@app.patch('/superadmin_patch/{id}', tags=["Patch"])
def superadmin_patch(id:int, payload:UpdateSuperadminSchema):
    sdmp = session.query(Superadmin).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(sdmp,key,value)
        session.commit()
        return {"detail":f"Superadmin has been edited"}
    
# creating a component that edits specific details of an admin
@app.patch('/admin_patch/{id}', tags=["Patch"])
def admin_patch(id:int, payload:UpdateAdminSchema):
    admp = session.query(Admin).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(admp,key,value)
        session.commit()
        return {"detail":f"Admin has been edited"}
    
# creating a component that edits specific details of a user
@app.patch('/user_patch/{id}', tags=["Patch"])
def user_patch(id:int, payload:UpdateUserSchema):
    udmp = session.query(User).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(udmp,key,value)
        session.commit()
        return {"detail":f"User has been edited"}
    
# creating a component that edits specific details of a product
@app.patch('/product_patch/{id}', tags=["Patch"])
def product_patch(id:int, payload:UpdateProductsSchema):
    pdmp = session.query(Products).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(pdmp,key,value)
        session.commit()
        return {"detail":f"Product has been edited"}

# creating a component that edits specific details of an image
@app.patch('/image_patch/{id}', tags=["Patch"])
def image_patch(id:int, payload:UpdateImagesSchema):
    idmp = session.query(Images).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(idmp,key,value)
        session.commit()
        return {"detail":f"Image has been edited"}
    
# creating a component that edits specific details of a review
@app.patch('/review_patch/{id}', tags=["Patch"])
def review_patch(id:int, payload:UpdateReviewsSchema):
    rdmp = session.query(Reviews).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(rdmp,key,value)
        session.commit()
        return {"detail":f"Review has been edited"}
    
# creating a component that edits specific details of a sale
@app.patch('/sale_patch/{id}', tags=["Patch"])
def sale_patch(id:int, payload:UpdateSalesSchema):
    selling = session.query(Sales).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(selling,key,value)
        session.commit()
        return {"detail":f"Sale has been edited"}
    
# creating a component that edits specific details of an order
@app.patch('/order_patch/{id}', tags=["Patch"])
def order_patch(id:int, payload:UpdateOrdersSchema):
    odmp = session.query(Orders).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(odmp,key,value)
        session.commit()
        return {"detail":f"Order has been edited"}
    
# ALL PUT REQUESTS
# creating a component that edits all details of a superadmin
@app.put('/superadmin_put/{id}', tags=["Put"])
def superadmin_put(id:int,payload:UpdateSuperadminSchema):
    superss = session.query(Superadmin).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(superss,key,value)
    session.commit()
    return {"detail":f"Superadmin completely updated"}
    
# creating a component that edits all details of an admin
@app.put('/admin_put/{id}', tags=["Put"])
def admin_put(id:int,payload:UpdateAdminSchema):
    admn = session.query(Admin).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(admn,key,value)
    session.commit()
    return {"detail":f"Admin completely updated"}
    
# creating a component that edits all details of a user
@app.put('/user_put/{id}', tags=["Put"])
def user_put(id:int,payload:UpdateUserSchema):
    userss = session.query(User).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(userss,key,value)
    session.commit()
    return {"detail":f"User completely updated"}
    
# creating a component that edits all details of a product
@app.put('/product_put/{id}', tags=["Put"])
def product_put(id:int,payload:UpdateProductsSchema):
    prods = session.query(Products).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(prods,key,value)
    session.commit()
    return {"detail":f"Product completely updated"}
    
# creating a component that edits all details of an image
@app.put('/image_put/{id}', tags=["Put"])
def image_put(id:int,payload:UpdateImagesSchema):
    imagess = session.query(Images).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(imagess,key,value)
    session.commit()
    return {"detail":f"Image completely updated"}
    
# creating a component that edits all details of a review
@app.put('/review_put/{id}', tags=["Put"])
def review_put(id:int,payload:UpdateReviewsSchema):
    revss = session.query(Reviews).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(revss,key,value)
    session.commit()
    return {"detail":f"Review completely updated"}
    
# creating a component that edits all details of a sale
@app.put('/sale_put/{id}', tags=["Put"])
def sale_put(id:int,payload:UpdateSalesSchema):
    saless = session.query(Sales).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(saless,key,value)
    session.commit()
    return {"detail":f"Sale completely updated"}
    
# creating a component that edits all details of an order
@app.put('/order_put/{id}', tags=["Put"])
def order_put(id:int,payload:UpdateOrdersSchema):
    odss = session.query(Orders).filter_by(id=id).first()
    for key,value in dict(payload).items():
        setattr(odss,key,value)
    session.commit()
    return {"detail":f"Order completely updated"}
    
# ALL DELETE REQUESTS
# Creating a component that deletes a superadmin
@app.delete('/deletesuper/{id}', tags=["Delete"])
def delete_super(id:int) -> None:
    sps = session.query(Superadmin).filter_by(id=id).first()
    session.delete(sps)
    session.commit()
    return {"detail":f"Superadmin deleted successfully"}

# Creating a component that deletes an admin
@app.delete('/deleteadmin/{id}', tags=["Delete"])
def delete_adm(id:int) -> None:
    aps = session.query(Admin).filter_by(id=id).first()
    session.delete(aps)
    session.commit()
    return {"detail":f"Admin deleted successfully"}

# Creating a component that deletes a user
@app.delete('/deleteuser/{id}', tags=["Delete"])
def delete_user(id:int) -> None:
    ups = session.query(User).filter_by(id=id).first()
    session.delete(ups)
    session.commit()
    return {"detail":f"User deleted successfully"}

# Creating a component that deletes a product
@app.delete('/deleteproduct/{id}', tags=["Delete"])
def delete_product(id:int) -> None:
    pss = session.query(Products).filter_by(id=id).first()
    session.delete(pss)
    session.commit()
    return {"detail":f"Product deleted successfully"}

# Creating a component that deletes an image
@app.delete('/deleteimage/{id}', tags=["Delete"])
def delete_image(id:int) -> None:
    ims = session.query(Images).filter_by(id=id).first()
    session.delete(ims)
    session.commit()
    return {"detail":f"Image deleted successfully"}

# Creating a component that deletes a review
@app.delete('/deletereview/{id}', tags=["Delete"])
def delete_review(id:int) -> None:
    rvs = session.query(Reviews).filter_by(id=id).first()
    session.delete(rvs)
    session.commit()
    return {"detail":f"Review deleted successfully"}

# Creating a component that deletes a sale
@app.delete('/deletesale/{id}', tags=["Delete"])
def delete_sale(id:int) -> None:
    sold = session.query(Sales).filter_by(id=id).first()
    session.delete(sold)
    session.commit()
    return {"detail":f"Sale deleted successfully"}

# Creating a component that deletes an order
@app.delete('/deleteorder/{id}', tags=["Delete"])
def delete_order(id:int) -> None:
    ods = session.query(Orders).filter_by(id=id).first()
    session.delete(ods)
    session.commit()
    return {"detail":f"Order deleted successfully"}
    
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000) 