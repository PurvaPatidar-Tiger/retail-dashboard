from flask import Flask
from flask_cors import CORS
from flask_jwt import JWT
from flask_jwt_extended import JWTManager
from flask_restful import Api

from db import db
from resources.customer import CustomerRegister, UserLogin
from resources.product import Product_Table
from resources.sales import (
    Sale,
    SaleList,
    SalesByDate,
    TotalSalesByDate,
    UniqueVisitors,
)
from security import authenticate, identity

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = "purva"
CORS(app)
api = Api(app)


@app.before_first_request
def create_tables():
    db.create_all()


jwt = JWTManager(app)

jwt = JWT(app, authenticate, identity)  # /auth

api.add_resource(UniqueVisitors, "/uniquevisitors")
api.add_resource(Sale, "/sale/<string:username>")
api.add_resource(SaleList, "/sales")
api.add_resource(UserLogin, "/login")
api.add_resource(CustomerRegister, "/register")
api.add_resource(Product_Table, "/product")
api.add_resource(SalesByDate, "/avg-sales")
api.add_resource(TotalSalesByDate, "/total-sales")

if __name__ == "__main__":
    db.init_app(app)
    app.run(port=5000, debug=True)
