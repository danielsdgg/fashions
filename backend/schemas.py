import datetime as _dt
import pydantic as _pydantic
from typing import List, Optional


# superadmin
class _SuperBase(_pydantic.BaseModel):
    email:str

class SuperCreate(_SuperBase):
    hashed_password:str

    class Config:
        orm_mode = True

class Superadmin(_SuperBase):
    id:int
    # add this
    class Config:
        orm_mode = True
        from_attributes = True
 
#  admin
class _AdminBase(_pydantic.BaseModel):
    email:str

class AdminCreate(_AdminBase):
    hashed_password:str

    class Config:
        orm_mode = True

class Admin(_AdminBase):
    id:int
    # super_id:int
    # add this
    class Config:
        orm_mode = True
        from_attributes = True

# user
class _UserBase(_pydantic.BaseModel):
    email:str

class UserCreate(_UserBase):
    hashed_password:str

    class Config:
        orm_mode = True

class User(_UserBase):
    id:int
    # admin_id:int
    # super_id:int
    # add this
    class Config:
        orm_mode = True
        from_attributes = True

# profile
class _ProfileBase(_pydantic.BaseModel):
    email:str

class ProfileCreate(_ProfileBase):
    hashed_password:str

    class Config:
        orm_mode = True

class Profile(_ProfileBase):
    id:int
    user_id:int
    # add this
    class Config:
        orm_mode = True
        from_attributes = True

# images
class _ImagesBase(_pydantic.BaseModel):
    image1:str
    image2:str
    image3:str

class ImageCreate(_ImagesBase):
    pass

    class Config:
        orm_mode = True

class Images(_ImagesBase):
    id:int
    product_id:int

    # add this
    class Config:
        orm_mode = True
        from_attributes = True

# products
class _ProductsBase(_pydantic.BaseModel):
    name:str
    description:str
    image:str
    price:int
    # images: Optional[List[_ImagesBase]] = None

class ProductCreate(_ProductsBase):
    pass

    class Config:
        orm_mode = True

class Products(_ProductsBase):
    id:int
    user_id:int
    date_created:_dt.datetime
    date_last_updated:_dt.datetime

    # add this
    class Config:
        orm_mode = True
        from_attributes = True

# services
class _ServiceBase(_pydantic.BaseModel):
    name:str
    email:str
    message:str

class ServiceCreate(_ServiceBase):
    pass

    class Config:
        orm_mode = True

class Service(_ServiceBase):
    id:int
    user_id:int

    # add this
    class Config:
        orm_mode = True
        from_attributes = True

# reviews
class _ReviewsBase(_pydantic.BaseModel):
    userr:str
    comments:str
    ratings:str

class ReviewCreate(_ReviewsBase):
    pass

    class Config:
        orm_mode = True

class Reviews(_ReviewsBase):
    id:int
    product_id:int
    user_id:int

    # add this
    class Config:
        orm_mode = True
        from_attributes = True

# sales
class _SalesBase(_pydantic.BaseModel):
    name:str
    quantity:str
    amount:str

class SalesCreate(_SalesBase):
    pass

    class Config:
        orm_mode = True

class Sales(_SalesBase):
    id:int
    product_id:int

    # add this
    class Config:
        orm_mode = True
        from_attributes = True

# cart
class _CartBase(_pydantic.BaseModel):
    name:str
    description:str
    image:str
    price:int
    quantity:int
    total_price:int

class CartCreate(_CartBase):
    pass

    class Config:
        orm_mode = True

class Cart(_CartBase):
    id:int
    user_id:int

    # add this
    class Config:
        orm_mode = True
        from_attributes = True

# orders
class _OrderBase(_pydantic.BaseModel):
    full_name:str
    address:str
    city:str

class OrderCreate(_OrderBase):
    pass

    class Config:
        orm_mode = True

class Orders(_OrderBase):
    id:int
    product_id:int
    user_id:int

    # add this
    class Config:
        orm_mode = True
        from_attributes = True


# instances
# creating an instance of images
# images_instance = _ImagesBase(
#     image1="image1_url",
#     image2="image2_url",
#     image3="image3_url"
# )

# # create a list of ImagesSchema instances
# images_list = [images_instance]

# # creating an instance of productSchema and associating it with the imagesSchema instance
# product_instance = _ProductsBase(
#     name="Product Name",
#     description="Product description",
#     image="product_image_url",
#     price=100,
#     images=[images_instance]
# )

# # access the images associated with the product like so:
# print(product_instance.images[0].image1)
# print(product_instance.images[0].image2)
# print(product_instance.images[0].image3)








