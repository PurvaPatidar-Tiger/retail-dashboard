from hmac import compare_digest

from flask_jwt_extended import create_access_token
from flask_restful import Resource, reqparse
from models.customer import CustomerModel

# from security import authenticate, identity


class CustomerRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("firstname", type=str, required=True, help="This field cannot be left blank!")
    parser.add_argument("lastname", type=str, required=True, help="This field cannot be left blank!")
    parser.add_argument("username", type=str, required=True, help="This field cannot be left blank!")
    parser.add_argument("password", type=str, required=True, help="This field cannot be left blank!")

    def post(self):
        data = CustomerRegister.parser.parse_args()

        if CustomerModel.find_by_username(data["username"]):
            return {"message": "A customer with that username already exists"}, 400
            # return {"message": "An item with name '{}' already exists.".format(name)}, 400

        user = CustomerModel(data["firstname"], data["lastname"], data["username"], data["password"])
        # user = CustomerModel(**data)
        user.save_to_db()

        return {"message": "Customer added successfully"}, 201


class UserLogin(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str, required=True, help="Required: user name")
    parser.add_argument("password", type=str, required=True, help="Required: password")

    @classmethod
    def post(cls):
        data = cls.parser.parse_args()

        user = CustomerModel.find_by_username(data["username"])

        if user and compare_digest(user.password, data["password"]):

            access_token = create_access_token(identity=user.id, fresh=True)
            return {"token": access_token}, 200

        return {"message": "Invalid Credentials!"}, 401
