import os
from flask import Flask
from werkzeug.debug import DebuggedApplication
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
# from flask_mail import Mail, Message  # Ensure this is included at the top of your file


app = Flask(__name__, static_folder="static")


# CORS(app, resources={r"*": {"origins": "*"}})
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
CORS(app)
# mail = Mail(app)
app.url_map.strict_slashes = False

app.config["DEBUG"] = True
app.config["SECRET_KEY"] = "XXXXX"
app.config["JSON_AS_ASCII"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///mydatabase.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Correct mail server for Gmail
# app.config['MAIL_PORT'] = 465  # Use port 465 for SSL
# app.config['MAIL_USERNAME'] = 'saran.jatuporn@gmail.com'
# app.config['MAIL_PASSWORD'] = 'sarantar1124'
# app.config['MAIL_USE_TLS'] = False
# app.config['MAIL_USE_SSL'] = True

# mail = Mail(app)

if app.debug:
    app.wsgi_app = DebuggedApplication(app.wsgi_app, evalex=True)

# Creating an SQLAlchemy instance
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import views  # noqa