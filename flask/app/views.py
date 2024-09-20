from flask import jsonify, request
from flask_cors import CORS
from app import app, db
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
app.config['MAIL_PASSWORD'] = 'lmup hwpn dhdv cacx' #'pejz mjje kyyt igax'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)


CORS(app)
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
        name_sp = data['name'].split(' ')
        new_user = User(email=data['email'], password=generate_random_password(),fname=name_sp[0],lname=name_sp[1],isAdmin=False)
        #########################################
        new_plan = Study_plan(planName=data['degree'],testEng=False,study_planID=data['stdID'],n1=0,n2=0,finished=False,comprehension=False,quality=False,core=0,select=0,free=0)
        ##################################3
        db.session.add(new_student)
        db.session.add(new_user)
        db.session.add(new_plan)
        db.session.commit()
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
def send_email():
    try:
        generated_password = generate_random_password()
        msg = Message(
            subject="Hello from Thars!!!",
            body=f"""โปรเจคจะรอดมั้ย
                    email: "arnarock6696@gmail.com"
                    password: {generated_password}
                    """,
            sender="taruuiop@gmail.com",
            recipients=["arnarock6696@gmail.com"]
        )
        
        mail.send(msg)
        return "Email sent successfully!"
    except Exception as e:
        app.logger.error("An error occurred while sending the email: %s", str(e))
        return "Failed to send email", 500

@app.route('/data', methods=['GET'])
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

