from app import db
from sqlalchemy_serializer import SerializerMixin

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)

    def __init__(self, fname, lname):
        self.fname = fname
        self.lname = lname

