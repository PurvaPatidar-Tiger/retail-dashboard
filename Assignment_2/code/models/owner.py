from db import db


class OwnerModel(db.Model):
    __tablename__ = "owner"

    id = db.Column(db.Integer, primary_key=True)
    ownername = db.Column(db.String(80))
    password = db.Column(db.String(80))

    def __init__(self, ownername, password):
        self.ownername = ownername
        self.password = password

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_ownername(cls, ownername):
        return cls.query.filter_by(ownername=ownername).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
