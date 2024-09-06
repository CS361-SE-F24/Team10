from app import db
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)  # Ensuring the email is unique and not null
    password = db.Column(db.String, nullable=False)  # Ensuring the password is not null
    fname = db.Column(db.String, nullable=False)  # Ensuring the first name is not null
    lname = db.Column(db.String, nullable=False)  # Ensuring the last name is not null
    isAdmin = db.Column(db.Boolean, default=False)  # Defaulting to False if not provided

    def __init__(self, email, password, fname, lname, isAdmin=False):
        self.email = email
        self.password = password
        self.fname = fname
        self.lname = lname
        self.isAdmin = isAdmin
