# publish
from app import db

class Publish(db.Model):
    __tablename__ = 'publish'

    id = db.Column(db.Integer, primary_key=True)
    stdID = db.Column(db.String(100), nullable=False)
    file = db.Column(db.LargeBinary)
    types = db.Column(db.String(50))

    def __init__(self, stdID,file,types):
        self.stdID = stdID
        self.file = file
        self.types = types