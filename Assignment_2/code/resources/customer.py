from flask_restful import Resource, reqparse
from models.customer import CustomerModel


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
        user.save_to_db()

        return {"message": "Customer added successfully"}, 201
