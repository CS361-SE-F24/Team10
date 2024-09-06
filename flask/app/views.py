from flask import jsonify, request
from flask_cors import CORS
from app import app, db
from app.models.user import User
from app.models.student import Student
import traceback
import secrets
import string


CORS(app)

@app.route('/home', methods=['GET'])
def get_data():
    data = {
        'key': 'Title',
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

        # Check if the email already exists in the database
        existing_student = Student.query.filter_by(email=email).first()
        if existing_student:
            return jsonify({"message": "Email already exists", "data": email}), 409  # 409 Conflict

        # If the email doesn't exist, proceed to add the student
        new_student = Student(
            stdID=data['stdID'], 
            name=data['name'], 
            status=data['degree'], 
            email=email, 
            tel=data['phone']
        )
        name_sp = data['name'].split(' ')
        new_user = User(email=data['email'], password=generate_random_password(),fname=name_sp[0],lname=name_sp[1],isAdmin=False)

        db.session.add(new_student)
        db.session.add(new_user)
        db.session.commit()

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
