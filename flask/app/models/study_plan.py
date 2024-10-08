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
    
    study_planID = db.Column(db.Integer, unique=True)
    nPublish_journal = db.Column(db.Integer)
    nPublish_proceeding = db.Column(db.Integer)
    nPublish_conferrence = db.Column(db.Integer)
    credit = db.Column(db.Integer)

    complete_course = db.Column(db.Boolean)

    def __init__(self, planName, testEng, testEng_filename, comprehension, comprehension_filename, quality, quality_filename, study_planID, nPublish_journal, nPublish_proceeding, nPublish_conferrence, credit, complete_course):
        self.planName = planName
        self.testEng = testEng
        self.testEng_filename = testEng_filename
        self.comprehension = comprehension
        self.comprehension_filename = comprehension_filename
        self.quality = quality
        self.quality_filename = quality_filename
        self.study_planID = study_planID
        self.nPublish_journal = nPublish_journal
        self.nPublish_proceeding = nPublish_proceeding
        self.nPublish_conferrence = nPublish_conferrence
        self.credit = credit
        self.complete_course = complete_course