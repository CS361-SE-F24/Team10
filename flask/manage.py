from flask.cli import FlaskGroup
from app import app, db
from app.models.user import User
from app.models.student import Student  # Ensure this is imported
from app.models.advisor import Advisor

cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():

    db.session.add(User(email="taruuiop@gmail.com",password="sarantar",fname="Saran", lname="Jatupornpitakkul",isAdmin=True,picture=None))
    db.session.add(Advisor(name="Advisor Kittipich",email="Kittipich@gmail.com",tel="0999999999"))
    # db.session.add(Student(stdID="650510642", name="Saran Jatupornpitakkul", status="study", email="Saran_jatuporn@cmu.ac.th", tel="0984892124"))
    db.session.commit()


if __name__ == "__main__":
    cli()
