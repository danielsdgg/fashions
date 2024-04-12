import datetime as _dt
import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash
import database as _database

class Superadmin(_database.Base):
    __tablename__ = 'superadmins'

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String, unique=True, index=True)
    hashed_password = _sql.Column(_sql.String)

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)

class Admin(_database.Base):
    __tablename__ = 'admins'

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String, unique=True, index=True)
    hashed_password = _sql.Column(_sql.String)

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)

class User(_database.Base):
    __tablename__ = 'users'

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String, unique=True, index=True)
    hashed_password = _sql.Column(_sql.String)

    products = _orm.relationship("Products", back_populates="user")
    profile = _orm.relationship("Profile", back_populates="user")
    service = _orm.relationship("Service", back_populates="user")
    reviews = _orm.relationship("Reviews", back_populates="user")
    orders = _orm.relationship("Orders", back_populates="user")
    carts = _orm.relationship("Cart", back_populates="user")

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)

class Profile(_database.Base):
    __tablename__ = 'profile'

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    first_name = _sql.Column(_sql.String, index=True)
    last_name = _sql.Column(_sql.String, index=True)
    email = _sql.Column(_sql.String, index=True)
    contacts = _sql.Column(_sql.Integer)
    profilepicture = _sql.Column(_sql.String, index=True, default="")
    hashed_password = _sql.Column(_sql.String)

    user = _orm.relationship("User", back_populates="profile")

class Products(_database.Base):
    __tablename__ = 'products'

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    # admin_id = _sql.Column(_sql.Integer, _sql.ForeignKey("admins.id"))
    name = _sql.Column(_sql.String, index=True)
    description = _sql.Column(_sql.String, index=True)
    image = _sql.Column(_sql.String, index=True, default="")
    price = _sql.Column(_sql.Integer)
    date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    date_last_updated = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)

    user = _orm.relationship("User", back_populates="products")
    images = _orm.relationship("Images", back_populates="product")
    reviews = _orm.relationship("Reviews", back_populates="product")
    sales = _orm.relationship("Sales", back_populates="product")
    orders = _orm.relationship("Orders", back_populates="product")

class Images(_database.Base):
    __tablename__ = 'images'

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    product_id = _sql.Column(_sql.Integer, _sql.ForeignKey("products.id"))
    image1 = _sql.Column(_sql.String, index=True, default="")
    image2 = _sql.Column(_sql.String, index=True, default="")
    image3 = _sql.Column(_sql.String, index=True, default="")

    product = _orm.relationship("Products", back_populates="images")

class Service(_database.Base):
    __tablename__ = 'service'

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey('users.id'))
    name = _sql.Column(_sql.String, index=True)
    email = _sql.Column(_sql.String, unique=True, index=True)
    message = _sql.Column(_sql.String, index=True)

    user = _orm.relationship("User", back_populates='service')

class Reviews(_database.Base):
    __tablename__ = 'reviews'

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    product_id = _sql.Column(_sql.Integer, _sql.ForeignKey("products.id"))
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey('users.id'))
    comments = _sql.Column(_sql.String, index=True)
    ratings = _sql.Column(_sql.String, index=True)

    product = _orm.relationship("Products", back_populates='reviews')
    user = _orm.relationship("User", back_populates="reviews")

class Sales(_database.Base):
    __tablename__ = 'sales'

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    product_id = _sql.Column(_sql.Integer, _sql.ForeignKey("products.id"))
    name = _sql.Column(_sql.String, index=True)
    quantity = _sql.Column(_sql.Integer, index=True)
    amount = _sql.Column(_sql.Integer, index=True)

    product = _orm.relationship("Products", back_populates="sales")

class Cart(_database.Base):
    __tablename__ = 'carts'

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    name = _sql.Column(_sql.String, index=True)
    description = _sql.Column(_sql.String, index=True)
    image = _sql.Column(_sql.String, index=True, default="")
    price = _sql.Column(_sql.Integer)
    quantity = _sql.Column(_sql.Integer, index=True)
    total_price = _sql.Column(_sql.Integer, index=True)

    user = _orm.relationship("User", back_populates="carts")

class Orders(_database.Base):
    __tablename__ = 'orders'

    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    product_id = _sql.Column(_sql.Integer, _sql.ForeignKey("products.id"))
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    full_name = _sql.Column(_sql.String, index=True)
    address = _sql.Column(_sql.String, index=True)
    city = _sql.Column(_sql.String, index=True)

    product = _orm.relationship("Products", back_populates="orders")
    user = _orm.relationship("User", back_populates="orders")



