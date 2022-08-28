from hmac import compare_digest

from flask_jwt_extended import create_access_token
from flask_restful import Resource, reqparse
from models.user_model import UserModel


class UserSignUp(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("name", type=str, required=True, help="This field cannot be left blank")
    parser.add_argument("email", type=str, required=True, help="This field cannot be left blank")

    parser.add_argument("password", type=str, required=True, help="This field cannot be left blank")

    def post(self):

        data = UserSignUp.parser.parse_args()
        user = UserModel.find_by_email(data["email"])

        if user:
            return {"message": f"A user with given email already exists having user id {user.id}", "status_code": 400}

        user = UserModel(**data)

        user.save_to_db()

        return {"message": f"User created successfully with user id {user.id}", "status_code": 200}


class UserSignin(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("email", type=str, required=True, help="Required: user name")
    parser.add_argument("password", type=str, required=True, help="Required: password")

    def post(self):
        data = UserSignin.parser.parse_args()

        user = UserModel.find_by_email(data["email"])

        if user and compare_digest(user.password, data["password"]):

            access_token = create_access_token(identity=user.id, fresh=True)
            return {
                "token": access_token,
                "user": {"id": user.id, "name": user.name, "email": user.email, "password": user.password},
            }, 200

        return {"message": "Invalid Credentials!"}, 401
