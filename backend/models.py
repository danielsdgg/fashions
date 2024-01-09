from sqlalchemy import create_engine, String, Column, Integer, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

Base = declarative_base()

class Superadmin(Base):
    __tablename__ = 'superadmins'
    id = Column(Integer, primary_key = True, autoincrement=True)
    email = Column(String())
    password = Column(String())    

    def __repr__(self):
        return f'<Superadmin: {self.email}>'

class Admin(Base):
    __tablename__ = 'admins'
    id = Column(Integer, primary_key = True, autoincrement=True)
    super_id = Column(Integer, ForeignKey('superadmins.id'))
    email = Column(String())
    password = Column(String())

    super = relationship("Superadmin", backref = 'admins')

    def __repr__(self):
        return f'<Admin: {self.email}>'

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key = True, autoincrement=True)
    admin_id = Column(Integer, ForeignKey('admins.id'))
    username = Column(String())
    email = Column(String())
    password = Column(String())

    # product_user=relationship("Products", backref="user")
    # order_user=relationship("Orders", backref="user")

    administrator = relationship("Admin", backref = 'users')

    def __repr__(self):
        return f'<User: {self.email}>'
    

# class Profile(Base):
#     __tablename__ = 'profile'
#     id = Column(Integer, primary_key = True, autoincrement=True)
#     users_id = Column(Integer, ForeignKey('user.id'))
#     fname = Column(String())
#     lname = Column(String())
#     gender = Column(String())
#     contacts = Column(Integer())
#     profilepicture = Column(String())
    



class Products(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key =True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String())
    description = Column(String())
    image = Column(String())
    price = Column(Integer())

    clients = relationship("User", backref = 'products')
    # img = relationship('Images', secondary='product_image', back_populates='product')
    # images_id = Column(Integer, ForeignKey("images.id"))
    # cart_id = Column(Integer, ForeignKey("carts.id"))
    # image = relationship("Images", backref = 'products')
    # cart = relationship("Cart", backref = 'products')

    # review_products=relationship("Reviews", backref="product")


    def __repr__(self):
        return f'<Products: {self.name}>'


class Images(Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key = True, autoincrement=True)
    image1 = Column(String())
    image2 = Column(String())
    image3 = Column(String())
    products_id = Column(Integer, ForeignKey("products.id"))


    # product_image = relationship("Products", backref = 'image')

    def __repr__(self):
        return f'<Images: {self.id}>'
    
class Services(Base):
    __tablename__ = 'services'
    id =Column(Integer, primary_key = True, autoincrement = True)
    name = Column(String())
    email = Column(String())

class Reviews(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key = True, autoincrement=True)
    comments = Column(String())
    ratings = Column(String())
    product_id=Column(Integer, ForeignKey("products.id"))

    product = relationship("Products", backref="review")

    def __repr__(self):
        return f'<Reviews: {self.id}>'

class Sales(Base):
    __tablename__ = 'sales'
    id = Column(Integer, primary_key = True, autoincrement=True)
    product_id=Column(Integer, ForeignKey("products.id"))

    product=relationship("Products", backref="sale")
    # cart_sales=relationship("Cart", backref="sale")

    def __repr__(self):
        return f'<Sales: {self.id}>'

class Cart(Base):
    __tablename__ = 'carts'
    id = Column(Integer, primary_key = True)
    sales_id = Column(Integer, ForeignKey("sales.id"))
    
    def __repr__(self):
        return f'<Cart: {self.id}>'

class Orders(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key = True, autoincrement=True)
    fee = Column(Integer())
    date = Column(Integer())
    products_id = Column(Integer, ForeignKey("products.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    product = relationship("Products", backref = 'order')
    users = relationship("User", backref="order")

    def __repr__(self):
        return f'<Orders: {self.id}>'


engine = create_engine('sqlite:///dan.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind = engine)
session = Session()


