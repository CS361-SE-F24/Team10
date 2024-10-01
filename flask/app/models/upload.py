from app import db

class Publish(db.Model):
    __tablename__ = 'publish'

    id = db.Column(db.Integer, primary_key=True)
    stdID = db.Column(db.String(100), nullable=False)
    filename = db.Column(db.String(50))
    types = db.Column(db.String(50))
    file = db.Column(db.LargeBinary)

    def __init__(self, stdID,filename,file,types):
        self.stdID = stdID
        self.filename = filename
        self.file = file
        self.types = types




# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'docx'}

# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# @app.route('/uploadfile', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         return jsonify({'message': 'No file part in the request'}), 400
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'message': 'No selected file'}), 400
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         upload = Upload(filename=filename, data=file.read())
#         db.session.add(upload)
#         db.session.commit()
#         return jsonify({'message': "File uploaded successfully"}), 201
#     else:
#         return jsonify({'message': 'File type not allowed'}), 400
