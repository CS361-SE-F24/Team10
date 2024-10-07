from flask import jsonify, request,send_file,abort
from flask_cors import CORS
from flask_login import login_user, login_required, logout_user, current_user
from app import app, db,login_manager
from app.models.user import User
from app.models.student import Student
from app.models.study_plan import Study_plan
from app.models.advisor import Advisor
from app.models.upload import Publish
from app.models.course import Course
import traceback
import secrets
import string
from flask_mail import Mail,Message
from io import BytesIO
import base64
import mimetypes
# Configure the mail server
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Replace with your mail server
app.config['MAIL_PORT'] = 587  # Usually 465 for SSL, 587 for TLS
app.config['MAIL_USERNAME'] = 'taruuiop@gmail.com'
app.config['MAIL_PASSWORD'] = 'kvqo qrve mmcn uzyi' #'pejz mjje kyyt igax'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)


CORS(app, supports_credentials=True)
# mail = Mail(app)
@app.route('/home', methods=['GET'])
def get_data():
    data = {
        'key': 'Web',
        'number': 650510642
    }
    return jsonify(data)


@app.route('/sent/data', methods=['POST'])
def post_data():
    try:
        data = request.json
        if not data or 'Fname' not in data or 'Lname' not in data:
            return jsonify({"message": "Invalid data"}), 400

        print(data)
        new_user = User(fname=data['Fname'], lname=data['Lname'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User added successfully"}), 201

    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

@app.route('/addstudent', methods=['POST'])
def addStudent():
    try:
        data = request.form  # Retrieve data from formData
        file = request.files.get('picture')  # Retrieve image file
        email = data.get('email')

        # Validate required fields
        if not email or not data.get('stdID') or not data.get('name'):
            return jsonify({"message": "Missing required fields"}), 400

        # Check if the email already exists
        existing_student = Student.query.filter_by(email=email).first()
        if existing_student:
            return jsonify({"message": "Email already exists", "data": email}), 409

        # Process advisor information
        advisor_name = data.get('advisor')

        if advisor_name == 'Other':  # If "Other" is selected, use customAdvisor
            advisor_name = data.get('customAdvisor')

            # Validate that customAdvisor is provided
            if not advisor_name:
                return jsonify({"message": "Custom advisor name is required"}), 400

        # Ensure advisor_name is not None or empty
        advisor = Advisor.query.filter_by(name=advisor_name).first()
        if not advisor:  # If advisor doesn't exist, create a new one
            advisor_email = data.get('email_advisor')
            if not advisor_email:
                return jsonify({"message": "Advisor email is required"}), 400

            new_advisor = Advisor(
                name=advisor_name,
                email=advisor_email,  # Assuming there's a field for advisor email
                tel="0999958855"  # Static tel for now, can be dynamic
            )
            db.session.add(new_advisor)
            db.session.commit()
            advisor = Advisor.query.filter_by(name=advisor_name).first()

        # Generate password and hash it
        pw = generate_random_password()

        # Create student and user
        new_student = Student(
            stdID=data.get('stdID'),
            name=data.get('name'),
            status="study",
            email=email,
            tel=data.get('tel'),
            advisorID=advisor.id,
            progress = "0%"
        )

        picture_data = file.read() if file else None

        new_user = User(
            email=email,
            password=pw,  # Store hashed password
            fname=data.get('name').split(' ')[0],
            lname=data.get('name').split(' ')[1] if len(data.get('name').split(' ')) > 1 else '',
            isAdmin=False,
            picture=picture_data
        )

        # Create a new study plan, ensuring all required parameters are included
        new_plan = Study_plan(
            planName=data.get('degree'),  # You may want to adjust this depending on your logic
            testEng=None,  # Set this to the correct value as needed
            testEng_filename=None,  # Set this to the correct value as needed
            study_planID=data.get('stdID'),  # Assuming this should match stdID
            nPublish=0,  # Default or actual value from your logic
            finished=False,  # Default value, adjust based on your requirements
            comprehension=None,  # Set this to the correct value as needed
            comprehension_filename=None,  # Set this to the correct value as needed
            quality=None,  # Set this to the correct value as needed
            quality_filename=None,  # Set this to the correct value as needed
            core=0,  # Default or actual value from your logic
            select=0,  # Default or actual value from your logic
            free=0,  # Default or actual value from your logic
            publishExam=None,  # Set this to the correct value as needed
            publishExam_filename=None  # Set this to the correct value as needed
            complete_course = False
        )

        # Send email with generated password
        send_email(email, pw)

        # Add new records to the session
        db.session.add(new_student)
        db.session.add(new_user)
        db.session.add(new_plan)
        db.session.commit()

        return jsonify({"message": "Student added successfully", "data": {"email": email, "stdID": data.get('stdID')}}), 200

    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500



def generate_random_password(length=12):
    # Ensure the length is at least 8 characters
    if length < 8:
        raise ValueError("Password length must be at least 8 characters")
    # Define the possible characters in the password (A-Z, a-z, 0-9)
    alphabet = string.ascii_letters + string.digits
    # Generate a secure random password
    password = ''.join(secrets.choice(alphabet) for _ in range(length))
    
    return password

@app.route('/send-email', methods=['POST'])
def send_email(email,password):
    try:
        msg = Message(
            subject="Hello from Thars!!!",
            body=f"""ทดสอบระบบงับเตง
email: {email}
password: {password}""",
            sender="taruuiop@gmail.com",
            recipients=[email]
        )
        print("sddddd")
        mail.send(msg)
        return "Email sent successfully!"
    except Exception as e:
        app.logger.error("An error occurred while sending the email: %s", str(e))
        return "Failed to send email", 500

@app.route('/data', methods=['GET'])
# @login_required
def data():
    students = Student.query.all()
    result = []
    no = 1
    for student in students:
        # Fetch the study plan associated with the student
        study_plan = Study_plan.query.filter_by(study_planID=student.stdID).first()
        
        # Fetch the advisor details associated with the student
        advisor = Advisor.query.filter_by(id=student.advisorID).first()

        result.append({
            'no': no,
            'name': student.name,
            'stdID': student.stdID,
            'degree': study_plan.planName ,
            'advisor': advisor.name ,
            'advisor_email': advisor.email ,
            'progress': student.progress,  # Update this logic for progress as needed
        })
        no += 1
    print(result)
    return jsonify(result)


################################################################333
@login_manager.user_loader
def load_user(user_id):
    # since the user_id is just the primary key of our
    # user table, use it in the query for the user
    return User.query.get(int(user_id))

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    student = Student.query.filter_by(email=data['email']).first()
    print(data['email'],data['password'])
    print("////////////////////////")
    print(user.email,user.password)
    if user and user.password == data['password']:
        login_user(user, remember=True)
        print(current_user)
        if user.isAdmin:
            return jsonify({"message": "Login successful", "isAdmin": user.isAdmin,"currentUser":user.id,"stdID":0}), 200
        return jsonify({"message": "Login successful", "isAdmin": user.isAdmin,"currentUser":user.id,"stdID":student.stdID}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/studentfix', methods=['POST'])
def studentfix():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

@app.route('/currentstudent', methods=['GET'])
def currentstudent():
    stdID = request.args.get('stdID')  # Get stdID from query parameters
    
    # Fetch the student record
    student = Student.query.filter_by(stdID=stdID).first()
    # advisor = Advisor.query.filter_by(id=student.advisorID).first()
    # Handle case where student is not found
    if student is None:
        return jsonify({"error": "Student not found"}), 404

    # Fetch the study plan associated with the student
    plan = Study_plan.query.filter_by(study_planID=student.stdID).first()
    advisor = Advisor.query.filter_by(id=student.advisorID).first()
    # If plan is not found, handle it if necessary
    plan_name = plan.planName if plan else "No plan available"
    user = User.query.filter_by(email=student.email).first()
    current_data = {
        'name': student.name,
        'tel': student.tel,
        'email': student.email,
        'plan': plan_name,
        # Convert picture binary data to Base64 string if it exists
        'picture': None, # Initialize as None
        'advisor': advisor.name ,
        'advisor_email': advisor.email ,
    }

    if user.picture:
        current_data['picture'] = base64.b64encode(user.picture).decode('utf-8')
    
    return jsonify(current_data), 200  # Return the data with status 200

###################################################



def get_file_data(file_binary, filename):
    if file_binary:
        return {
            'file': base64.b64encode(file_binary).decode('utf-8'),
            'fileType': mimetypes.guess_type(filename)[0]  # Pass actual filename
        }
    return None


@app.route('/currentstudentplan', methods=['GET'])
def currentstudentplan():
    stdID = request.args.get('stdID')
    study_plan = Study_plan.query.filter_by(study_planID=stdID).first()

    if study_plan is None:
        return jsonify({"error": "Student not found"}), 404

    current_data = {
        'testEng': get_file_data(study_plan.testEng, 'testEng.pdf'),  # Example filename
        'nPublish': study_plan.nPublish,
        'comprehension': get_file_data(study_plan.comprehension, 'comprehension.pdf'),
        'quality': get_file_data(study_plan.quality, 'quality.pdf'),
        'publishExam': get_file_data(study_plan.publishExam, 'publishExam.pdf'),
        'complete_course': study_plan.complete_course
    }

    return jsonify(current_data), 200





####################################################3
@app.route('/uploadfile', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': "No file part in the request"}), 400

    file = request.files['file']
    stdID = request.form.get('stdID')
    types = request.form.get('types')

    if file.filename == '':
        return jsonify({'message': "No selected file"}), 400

    # ตรวจสอบว่ามีไฟล์ของ stdID นี้ในฐานข้อมูลหรือไม่
    existing_file = Publish.query.filter_by(stdID=stdID, filename=file.filename).first()
    if existing_file:
        return jsonify({'message': "This file already exists for the student"}), 400

    # ถ้าไม่มี ให้ทำการบันทึก
    upload = Publish(stdID=stdID, filename=file.filename, file=file.read(), types=types)
    db.session.add(upload)
    db.session.commit()

    return jsonify({'message': "File uploaded successfully"}), 200



@app.route('/downloadplan/<upload_id>/<type_exam>')
def downloadplan(upload_id, type_exam):
    study_plan = Study_plan.query.filter_by(study_planID=upload_id).first()
    if not study_plan:
        return jsonify({"error": "Study plan not found"}), 404

    if type_exam == "testEng":
        file_data = study_plan.testEng
        filename = study_plan.testEng_filename
    elif type_exam == "comprehension":
        file_data = study_plan.comprehension
        filename = study_plan.comprehension_filename
    elif type_exam == "quality":
        file_data = study_plan.quality
        filename = study_plan.quality_filename
    elif type_exam == "publishExam":
        file_data = study_plan.publishExam
        filename = study_plan.publishExam_filename
    else:
        return jsonify({"error": "Invalid exam type"}), 400

    if not file_data:
        return jsonify({"error": "No file available for the requested exam type"}), 404

    # Use the stored file name when sending the file
    return send_file(BytesIO(file_data), download_name=filename, as_attachment=True)



@app.route('/download/<upload_id>')
def download(upload_id):
    upload = Publish.query.filter_by(id=upload_id).first()
    return send_file(BytesIO(upload.file), download_name=upload.filename, as_attachment=True)


@app.route('/uploads', methods=['GET'])
def get_uploaded_files():
    stdID = request.args.get('stdID')  # Get stdID from the request parameters
    if not stdID:
        return jsonify({"message": "stdID is required"}), 400
    try:
        uploads = Publish.query.filter_by(stdID=stdID).all()  # Get all uploads for the given stdID
        files = [{'id': upload.id, 'filename': upload.filename} for upload in uploads]
        return jsonify({'files': files}), 200
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


@app.route('/editprogress', methods=['POST'])
def editprogress():
    try:
        # Extract form data and file uploads
        study_planID = request.form.get('stdID')
        testEng_file = request.files.get('testEng')
        comprehensive_file = request.files.get('comprehensiveExam')
        qualifying_file = request.files.get('QualifyingExam')
        nPublish = request.form.get('nPublish')

        # Debug print to inspect form data and file uploads
        print({
            "study_planID": study_planID,
            "testEng_file": testEng_file,
            "comprehensive_file": comprehensive_file,
            "qualifying_file": qualifying_file,
            "nPublish": nPublish
        })

        # Find the study plan by student ID
        study_plan = Study_plan.query.filter_by(study_planID=study_planID).first()

        if not study_plan:
            return jsonify({"error": "Study plan not found"}), 404

        # Update study plan fields if files are provided, skip if None
        if testEng_file is not None and testEng_file.filename != '':
            study_plan.testEng = testEng_file.read()
            study_plan.testEng_filename = testEng_file.filename
        elif testEng_file is not None and testEng_file.filename == '':
            # If file is explicitly empty, reset the field
            study_plan.testEng = None
            study_plan.testEng_filename = None

        if comprehensive_file is not None and comprehensive_file.filename != '':
            study_plan.comprehension = comprehensive_file.read()
            study_plan.comprehension_filename = comprehensive_file.filename
        elif comprehensive_file is not None and comprehensive_file.filename == '':
            # If file is explicitly empty, reset the field
            study_plan.comprehension = None
            study_plan.comprehension_filename = None

        if qualifying_file is not None and qualifying_file.filename != '':
            study_plan.quality = qualifying_file.read()
            study_plan.quality_filename = qualifying_file.filename
        elif qualifying_file is not None and qualifying_file.filename == '':
            # If file is explicitly empty, reset the field
            study_plan.quality = None
            study_plan.quality_filename = None

        # Update nPublish if provided
        if nPublish is not None:
            study_plan.nPublish = int(nPublish)

        # Commit changes to the database
        db.session.commit()
        return jsonify({"message": "Progress updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/addcourse', methods=['POST'])
def add_course():
    data = request.get_json()
    print(data)
    new_course = Course(
        courseID=data['courseID'],
        types=data['types'],
        credit=data['credit'],
        planName=data['planName']
    )
    db.session.add(new_course)
    db.session.commit()

    print(f"Added course with ID: {new_course.courseID}")  # Debugging log

    return jsonify({'message': 'Course added successfully!'}), 201



@app.route('/courses', methods=['GET'])
def get_courses():
    plan_name = request.args.get('planName')
    
    if plan_name:
        courses = Course.query.filter_by(planName=plan_name).all()
    else:
        courses = Course.query.all()
    
    if not courses:
        return jsonify({'message': 'No courses found'}), 200

    return jsonify([{
        'courseID': course.courseID,
        'types': course.types,
        'credit': course.credit,
        'planName': course.planName
    } for course in courses]), 200


@app.route('/planNames', methods=['GET'])
def get_plan_names():
    plan_names = db.session.query(Course.planName).distinct().all()
    plan_names_list = [planName[0] for planName in plan_names]  # Flatten the result
    return jsonify(plan_names_list)


@app.route('/getcourses', methods=['GET'])
def get_courses_by_stdID():
    stdID = request.args.get('stdID')
    if not stdID:
        return jsonify({'error': 'stdID is required'}), 400

    # Fetch the study plan using stdID
    study_plan = Study_plan.query.filter_by(study_planID=stdID).first()
    if not study_plan:
        return jsonify({'error': 'Study plan not found'}), 404

    # Mapping study plan names from the frontend to the backend planName
    planName_map = {
        "Master_Degree (แผน ก แบบ ก 1)": "M.",
        "Master_Degree (แผน ก แบบ ก 2)": "M.",
        "Master_Degree3 (แผน ข)": "M.",
        "PhD1.1": "Ph.D.",
        "PhD2.2": "Ph.D."
    }

    planName = planName_map.get(study_plan.planName, None)
    if not planName:
        return jsonify({'error': 'Plan name mapping not found'}), 404

    # Fetch courses using the mapped plan name
    courses = Course.query.filter_by(planName=planName).all()
    if not courses:
        return jsonify({'error': 'No courses found for this student'}), 404

    course_list = [
        {
            'courseID': course.courseID,
            'credit': course.credit,
            'planName': course.planName
        }
        for course in courses
    ]
    
    return jsonify({'courses': course_list}), 200

@app.route('/updatepercent', methods=['POST'])
def updateper():
    data = request.get_json()  # Get the JSON data from the request
    stdID = data.get('stdID')  # Extract stdID
    progressPercentage = data.get('progressPercentage')  # Extract progressPercentage

    student = Student.query.filter_by(stdID=stdID).first()
    
    if student:
        student.progress = f"{progressPercentage}%"
        db.session.commit()  # Save changes to the database

        print(f"Student ID: {stdID}, Progress Percentage: {progressPercentage}%")
        return jsonify({"message": "Progress percentage updated successfully"}), 200
    else:
        return jsonify({"error": "Student not found"}), 404

@app.route('/deleteStudent/<stdID>', methods=['DELETE'])
def delete_student(stdID):
    # Find the student
    student = Student.query.filter_by(stdID=stdID).first()
    user = User.query.filter_by(email=student.email).first()
    
    if student:
        # Delete associated study plans
        study_plans = Study_plan.query.filter_by(study_planID=stdID).all()  # Assuming stdID is in Study_plan
        for plan in study_plans:
            db.session.delete(plan)
        
        # Delete associated publish records
        publishes = Publish.query.filter_by(stdID=stdID).all()  # Assuming stdID is in Publish
        for publish in publishes:
            db.session.delete(publish)

        # Finally, delete the student
        db.session.delete(student)
        db.session.delete(user)
        db.session.commit()  # Commit all deletions to the database
        
        return jsonify({"message": "Student and associated records deleted successfully"}), 200
    else:
        return jsonify({"error": "Student not found"}), 404
