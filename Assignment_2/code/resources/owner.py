from flask_restful import Resource, reqparse
from models.owner import OwnerModel


class OwnerRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("ownername", type=str, required=True, help="This field cannot be left blank!")
    parser.add_argument("password", type=str, required=True, help="This field cannot be left blank!")

    def post(self):
        data = OwnerRegister.parser.parse_args()

        if OwnerModel.find_by_ownername(data["ownername"]):
            return {"message": "A owner with that username already exists"}, 400

        owner = OwnerModel(data["ownername"], data["password"])
        owner.save_to_db()

        return {"message": "Owner added successfully"}, 201
