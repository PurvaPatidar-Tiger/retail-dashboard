from flask_restful import Resource, reqparse
from models.product import ProductModel


class Product_Table(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("product_id", type=str, required=True, help="This field cannot be left blank!")
    parser.add_argument("product", type=str, required=True, help="This field cannot be left blank!")
    parser.add_argument("description", type=str, required=True, help="This field cannot be left blank!")

    def post(self):
        data = Product_Table.parser.parse_args()

        if ProductModel.find_by_product_id(data["product_id"]):
            return {"message": "This product already exists"}, 400

        user = ProductModel(data["product_id"], data["product"], data["description"])
        user.save_to_db()

        return {"message": "Product created successfully"}, 201
