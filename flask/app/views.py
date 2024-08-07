from flask import jsonify, request
from flask_cors import CORS
from app import app, db
from app.models.test import User

CORS(app)

@app.route('/home', methods=['GET'])
def get_data():
    data = {
        'key': 'test',
        'number': 123
    }
    return jsonify(data)


@app.route('/sent/data', methods=['POST'])
def post_data():
    data = request.json# Print the full traceback
    print(data)
    # new_user = User(fname=data['Fname'],lname=data['Lname'])
    # db.session.add(new_user)
    # db.session.commit()
    print("//////////////**********/////////////")
    return jsonify({"message": "An error occurred", "error": str()}), 201