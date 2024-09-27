from app import db
from sqlalchemy_serializer import SerializerMixin

class Study_plan(db.Model, SerializerMixin):
    __tablename__ = 'study_plan'
    id = db.Column(db.Integer, primary_key=True)
    planName = db.Column(db.String)
    testEng = db.Column(db.LargeBinary) #
    study_planID = db.Column(db.Integer, unique=True) 
    nPublish = db.Column(db.Integer) #
    finished = db.Column(db.Boolean) 
    comprehension = db.Column(db.LargeBinary) #
    quality = db.Column(db.LargeBinary) #
    publishExam = db.Column(db.LargeBinary) #
    core = db.Column(db.Integer)
    select = db.Column("select", db.Integer)  # ใช้ double quotes เพราะ `select` เป็นคำสงวน
    free = db.Column(db.Integer)

    def __init__(self, planName, testEng, study_planID, nPublish, finished, comprehension, quality, core, select, free,publishExam):
        self.planName = planName
        self.testEng = testEng
        self.study_planID = study_planID
        self.nPublish = nPublish
        self.finished = finished
        self.comprehension = comprehension
        self.quality = quality
        self.core = core
        self.select = select
        self.free = free
        self.publishExam = publishExam
