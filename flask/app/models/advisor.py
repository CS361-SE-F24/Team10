from app import db

class Advisor(db.Model):
    __tablename__ = 'advisor'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    tel = db.Column(db.String(15), nullable=True)

    def __init__(self, name, email, tel):
        self.name = name
        self.email = email
        self.tel = tel