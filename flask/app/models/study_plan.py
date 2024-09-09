from app import db
from sqlalchemy_serializer import SerializerMixin

class Study_plan(db.Model, SerializerMixin):
    __tablename__ = 'study_plan'
    id = db.Column(db.Integer, primary_key=True)
    planName = db.Column(db.String)
    testEng = db.Column(db.Boolean)
    study_planID = db.Column(db.Integer, unique=True)
    n1 = db.Column(db.Integer)
    n2 = db.Column(db.Integer)
    finished = db.Column(db.Boolean)
    comprehension = db.Column(db.Boolean)
    quality = db.Column(db.Boolean)
    core = db.Column(db.Integer)
    select = db.Column("select", db.Integer)  # ใช้ double quotes เพราะ `select` เป็นคำสงวน
    free = db.Column(db.Integer)

    def __init__(self, planName, testEng, study_planID, n1, n2, finished, comprehension, quality, core, select, free):
        self.planName = planName
        self.testEng = testEng
        self.study_planID = study_planID
        self.n1 = n1
        self.n2 = n2
        self.finished = finished
        self.comprehension = comprehension
        self.quality = quality
        self.core = core
        self.select = select
        self.free = free
