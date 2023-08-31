from sqlalchemy import create_engine, String, Column, Integer, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

Base = declarative_base()

class Superadmin(Base):
    __tablename__ = 'superadmin'
    id = Column(Integer, primary_key = True)
    email = Column(String())
    password = Column(String())

    def __repr__(self):
        return f'<Superadmin: {self.email}>'

class Admin(Base):
    __tablename__ = 'admin'
    id = Column(Integer, primary_key = True)
    supers = Column(Integer, ForeignKey('superadmin.id'))
    email = Column(String())
    password = Column(String())

    super = relationship("Superadmin", backref = 'admin')

    def __repr__(self):
        return f'<Admin: {self.email}>'

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key = True)
    adm = Column(Integer, ForeignKey('admin.id'))
    email = Column(String())
    password = Column(String())

    administrator = relationship("Admin", backref = 'user')

    def __repr__(self):
        return f'<User: {self.email}>'

class Profile(Base):
    __tablename__ = 'profile'
    id = Column(Integer, primary_key = True)
    fname = Column(String())
    lname = Column(String())
    gender = Column(String())
    email = Column(String())
    contacts = Column(Integer())
    profilepicture = Column(String())

    def __repr__(self):
        return f'<Profile: {self.fname}>'

class Products(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key =True)
    user_id = Column(Integer, ForeignKey("user.id"))
    images_id = Column(Integer, ForeignKey("images.id"))
    cart_id = Column(Integer, ForeignKey("cart.id"))
    name = Column(String())
    description = Column(String())
    image = Column(String())
    price = Column(String())

    clients = relationship("User", backref = 'products')
    image = relationship("Images", backref = 'products')
    cart = relationship("Cart", backref = 'products')

    def __repr__(self):
        return f'<Products: {self.name}>'


class Images(Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key = True)
    products_id = Column(Integer, ForeignKey("products.id"))
    image1 = Column(String())
    image2 = Column(String())
    image3 = Column(String())

    product = relationship("Products", backref = 'images')

    def __repr__(self):
        return f'<Images: {self.id}>'

class Reviews(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key = True)
    comments = Column(String())
    ratings = Column(String())

    products = relationship("Products", backref = 'reviews')

    def __repr__(self):
        return f'<Reviews: {self.id}>'

class Sales(Base):
    __tablename__ = 'sales'
    id = Column(Integer, primary_key = True)

    product = relationship("Products", backref = "sales")

    def __repr__(self):
        return f'<Sales: {self.id}>'

class Cart(Base):
    __tablename__ = 'cart'
    id = Column(Integer, primary_key = True)

    sales_id = Column(Integer, ForeignKey("sales.id"))

    def __repr__(self):
        return f'<Cart: {self.id}>'

class Orders(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key = True)
    fee = Column(Integer())
    date = Column(String())
    products_id = Column(Integer, ForeignKey("products.id"))
    user_id = Column(Integer, ForeignKey("user.id"))


    product = relationship("Products", backref = 'orders')

    def __repr__(self):
        return f'<Orders: {self.id}>'


engine = create_engine('sqlite:///dan.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind = engine)
session = Session()


