from sqlalchemy import create_engine, String, Column, Integer, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

Base = declarative_base()

class Superadmin(Base):
    __tablename__ = 'superadmins'
    id = Column(Integer, primary_key = True)
    email = Column(String())
    password = Column(String())

    admin=relationship("Admin" , backref="superadmin")

    

    def __repr__(self):
        return f'<Superadmin: {self.email}>'

class Admin(Base):
    __tablename__ = 'admins'
    id = Column(Integer, primary_key = True)
    supers = Column(Integer, ForeignKey('superadmins.id'))
    email = Column(String())
    password = Column(String())

    user=relationship("User", backref="admin")

    # super = relationship("Superadmin", backref = 'admin')

    def __repr__(self):
        return f'<Admin: {self.email}>'

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key = True)
    adm = Column(Integer, ForeignKey('admins.id'))
    email = Column(String())
    password = Column(String())
    fname = Column(String())
    lname = Column(String())
    gender = Column(String())
    contacts = Column(Integer())
    profilepicture = Column(String())

    product=relationship("Products", backref="user")
    order=relationship("Orders", backref="user")

    # administrator = relationship("Admin", backref = 'user')

    def __repr__(self):
        return f'<User: {self.email}>'


class Products(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key =True)
    user_id = Column(Integer, ForeignKey("users.id"))
    images_id = Column(Integer, ForeignKey("images.id"))
    cart_id = Column(Integer, ForeignKey("carts.id"))
    name = Column(String())
    description = Column(String())
    image = Column(String())
    price = Column(Integer())

    # clients = relationship("User", backref = 'products')
    # image = relationship("Images", backref = 'products')
    # cart = relationship("Cart", backref = 'products')

    review=relationship("Reviews", backref="product")


    def __repr__(self):
        return f'<Products: {self.name}>'


class Images(Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key = True)
    image1 = Column(String())
    image2 = Column(String())
    image3 = Column(String())

    product = relationship("Products", backref = 'image')

    def __repr__(self):
        return f'<Images: {self.id}>'

class Reviews(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key = True)
    comments = Column(String())
    ratings = Column(String())
    product_id=Column(Integer, ForeignKey("products.id"))

    def __repr__(self):
        return f'<Reviews: {self.id}>'

class Sales(Base):
    __tablename__ = 'sales'
    id = Column(Integer, primary_key = True)
    product_id=Column(Integer, ForeignKey("products.id"))

    # product=relationship("Products", backref="sale")
    cart=relationship("Cart", backref="sale")

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
    id = Column(Integer, primary_key = True)
    fee = Column(Integer())
    date = Column(Integer())
    # products_id = Column(Integer, ForeignKey("products.id"))
    user_id = Column(Integer, ForeignKey("users.id"))


    # product = relationship("Products", backref = 'orders')

    def __repr__(self):
        return f'<Orders: {self.id}>'


engine = create_engine('sqlite:///dan.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind = engine)
session = Session()


