from app import db
from sqlalchemy_serializer import SerializerMixin

class Study_plan(db.Model, SerializerMixin):
    __tablename__ = 'study_plan'
    id = db.Column(db.Integer, primary_key=True)
    planName = db.Column(db.String)
    
    # File fields
    testEng = db.Column(db.LargeBinary)  # File data
    testEng_filename = db.Column(db.String)  # File name
    
    comprehension = db.Column(db.LargeBinary)  # File data
    comprehension_filename = db.Column(db.String)  # File name
    
    quality = db.Column(db.LargeBinary)  # File data
    quality_filename = db.Column(db.String)  # File name
    
    publishExam = db.Column(db.LargeBinary)  # File data
    publishExam_filename = db.Column(db.String)  # File name
    
    study_planID = db.Column(db.Integer, unique=True)
    nPublish = db.Column(db.Integer)
    finished = db.Column(db.Boolean)
    
    core = db.Column(db.Integer)
    select = db.Column("select", db.Integer)  # ใช้ double quotes เพราะ `select` เป็นคำสงวน
    free = db.Column(db.Integer)

    complete_course = db.Column(db.Boolean)

    def __init__(self, planName, testEng, testEng_filename, study_planID, nPublish, finished, comprehension, comprehension_filename, quality, quality_filename, core, select, free, publishExam, publishExam_filename,complete_course):
        self.planName = planName
        self.testEng = testEng
        self.testEng_filename = testEng_filename
        self.study_planID = study_planID
        self.nPublish = nPublish
        self.finished = finished
        self.comprehension = comprehension
        self.comprehension_filename = comprehension_filename
        self.quality = quality
        self.quality_filename = quality_filename
        self.core = core
        self.select = select
        self.free = free
        self.publishExam = publishExam
        self.publishExam_filename = publishExam_filename
        self.complete_course = complete_course
