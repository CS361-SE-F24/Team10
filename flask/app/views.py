from flask import jsonify, request
from flask_cors import CORS
from flask_login import login_user, login_required, logout_user, current_user
from app import app, db,login_manager
from app.models.user import User
from app.models.student import Student
from app.models.study_plan import Study_plan
import traceback
import secrets
import string
from flask_mail import Mail,Message

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
        data = request.json  # Corrected request.json access
        email = data['email']
        print(data)
        # Check if the email already exists in the database
        existing_student = Student.query.filter_by(email=email).first()
        if existing_student:
            return jsonify({"message": "Email already exists", "data": email}), 409  # 409 Conflict

        # If the email doesn't exist, proceed to add the student
        new_student = Student(
            stdID=data['stdID'], 
            name=data['name'], 
            status="study", 
            email=email, 
            tel=data['tel']
        )
        pw = generate_random_password()
        name_sp = data['name'].split(' ')
        new_user = User(email=data['email'], password=pw,fname=name_sp[0],lname=name_sp[1],isAdmin=False)
        #########################################
        new_plan = Study_plan(planName=data['degree'],testEng=False,study_planID=data['stdID'],n1=0,n2=0,finished=False,comprehension=False,quality=False,core=0,select=0,free=0)
        ##################################3
        db.session.add(new_student)
        db.session.add(new_user)
        db.session.add(new_plan)
        db.session.commit()
        send_email(data['email'],pw)
        print("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        # Return a valid response
        return jsonify({"message": "Student data received successfully", "data": data}), 200
    
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
    # study_plan = Study_plan.query.filter_by(stdID=students.stdID).first()
    result = []
    no = 1
    for student in students:
        study_plan = Study_plan.query.filter_by(study_planID=student.stdID).first()
        result.append({
            'no': no,
            'name': student.name,
            'stdID': student.stdID,
            'degree': study_plan.planName,
            #######################
            'progress': 0,
            ########################
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
    # User = request.json()
    stdID = request.args.get('stdID')  # Get stdID from query parameters
    student = Student.query.filter_by(stdID=stdID).first()
    plan = Study_plan.query.filter_by(study_planID=student.stdID).first()
    # print(f"Received stdID: {student}")
    current_data = {'name':student.name,'tel':student.tel,'email':student.email,'plan':plan.planName}
    print(current_data)
    # Logic to retrieve student data using stdID
    return jsonify(current_data)
