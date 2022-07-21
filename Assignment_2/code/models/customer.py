from db import db


class CustomerModel(db.Model):
    __tablename__ = "customer"

    firstname = db.Column(db.String(80))
    lastname = db.Column(db.String(80))
    username = db.Column(db.String(80), primary_key=True)
    password = db.Column(db.String(80))

    sales = db.relationship("SalesModel", lazy="dynamic")

    def __init__(self, firstname, lastname, username, password):
        self.firstname = firstname
        self.lastname = lastname
        self.username = username
        self.password = password

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
