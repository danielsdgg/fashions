from sqlalchemy import create_engine, String, Column, Integer, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship, validates

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

    super = relationship("Superadmin", backref = 'admin')

    def __repr__(self):
        return f'<Admin: {self.email}>'

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key = True, autoincrement=True)
    admin_id = Column(Integer, ForeignKey('admins.id'))
    super_ad = Column(Integer, ForeignKey('superadmins.id'))
    username = Column(String())
    email = Column(String())
    password = Column(String())

    # product_user=relationship("Products", backref="user")
    # order_user=relationship("Orders", backref="user")

    administrator = relationship("Admin", backref = 'user')
    supp = relationship("Superadmin", backref = 'user')

    def __repr__(self):
        return f'<User: {self.email}>'
    
class Profile(Base):
    __tablename__ = 'profile'
    id = Column(Integer, primary_key = True, autoincrement=True)
    users_id = Column(Integer, ForeignKey('users.id'))
    fname = Column(String())
    lname = Column(String())
    email = Column(String())
    gender = Column(String())
    contacts = Column(Integer())
    profilepicture = Column(String())
    password = Column(Integer())

    def __repr__(self):
        return f'<User: {self.fname}>'

class Products(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key =True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String())
    description = Column(String())
    image = Column(String())
    price = Column(Integer())
    images = Column(String())

    clients = relationship("User", backref = 'product')
    images = relationship("Images", backref="product")
    cartt = relationship("Cart", backref = 'product')

    def __repr__(self):
        return f'<Products: {self.name}>'

class Images(Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key = True, autoincrement=True)
    products_id = Column(Integer, ForeignKey("products.id"))
    image1 = Column(String())
    image2 = Column(String())
    image3 = Column(String())

    def __repr__(self):
        return f'<Images: {self.id}>'
    
class Services(Base):
    __tablename__ = 'services'
    id = Column(Integer, primary_key = True, autoincrement = True)
    user_id = Column(Integer, ForeignKey('users.id'))
    name = Column(String())
    email = Column(String())
    message = Column(String())

    userrr = relationship("User", backref='service')

    def __repr__(self):
        return f'<Images: {self.id}>'

class Reviews(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key = True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    userr = Column(Integer, ForeignKey('users.id'))
    comments = Column(String())
    ratings = Column(Integer())

    product = relationship("Products", backref='review')
    clientt = relationship("User", backref = 'review')

    def __repr__(self):
        return f'<Reviews: {self.id}>'

class Sales(Base):
    __tablename__ = 'sales'
    id = Column(Integer, primary_key = True, autoincrement=True)
    product_id=Column(Integer, ForeignKey("products.id"))
    name = Column(String())
    quantity = Column(Integer())
    amount = Column(Integer())

    product=relationship("Products", backref="sale")
    # cart_sales=relationship("Cart", backref="sale")

    def __repr__(self):
        return f'<Sales: {self.id}>'

class Cart(Base):
    __tablename__ = 'carts'
    id = Column(Integer, primary_key = True)
    client_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey('products.id'))
    name = Column(String())
    description = Column(String())
    image = Column(String())
    quantity = Column(Integer())
    total_price = Column(Integer())

    
    def __repr__(self):
        return f'<Cart: {self.id}>'

class Orders(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key = True, autoincrement=True)
    products_id = Column(Integer, ForeignKey("products.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String())
    fee = Column(Integer())
    date = Column(Integer())

    product = relationship("Products", backref = 'order')
    users = relationship("User", backref="order")

    def __repr__(self):
        return f'<Orders: {self.id}>'


engine = create_engine('sqlite:///dan.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind = engine)
session = Session()


