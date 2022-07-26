from datetime import datetime

from flask_jwt import jwt_required
from flask_restful import Resource, reqparse
from models.customer import CustomerModel
from models.sales import SalesModel


class Sale(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("product_id", type=str, required=True, help="All 3 fields are required.")
    parser.add_argument("sales_amount", type=float, required=True, help="All 3 fields are required.")
    parser.add_argument("sale_date", type=int, required=True, help="All 3 fields are required.")

    def get(self, username):
        item = SalesModel.find_by_username(username)
        if item:
            return item.json()
        return {"message": "Not found"}

    @jwt_required()
    def post(self, username):
        if CustomerModel.find_by_username(username):
            data = Sale.parser.parse_args()
            data["sale_date"] = datetime.fromtimestamp(data["sale_date"])
            print(data["sale_date"])
            item = SalesModel(username, **data)
            try:
                item.save_to_db()
                return item.json(), 201
            except:
                return {"message": "An error occured inserting the item."}, 500  # internal server error

        else:
            return {"message": "First register as a Customer"}

    @jwt_required()
    def delete(self, username):
        item = SalesModel.find_by_username(username)
        if item:
            item.delete_from_db()

        return {"messgae": "Deleted"}


class SaleList(Resource):
    def get(self):
        # return {"items": [x.json() for x in SalesModel.query.all()]}
        return {"items": list(map(lambda x: x.json(), SalesModel.query.all()))}


class SalesByDate(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("sale_date", type=str, required=True, help="This field cannot be left blank!")

    @jwt_required()
    def get(self):
        data = SalesByDate.parser.parse_args()
        avg_sales = SalesModel.average_sales_by_date(data["sale_date"])
        return {"date": str(datetime.fromtimestamp(int(data["sale_date"]))), "average_sales": avg_sales[0]}


class TotalSalesByDate(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("sale_date", type=str, required=True, help="This field cannot be left blank!")

    @jwt_required()
    def get(self):
        data = SalesByDate.parser.parse_args()
        total_sales = SalesModel.total_sales_by_date(data["sale_date"])
        return {"date": str(datetime.fromtimestamp(int(data["sale_date"]))), "total_sales": total_sales[0]}
