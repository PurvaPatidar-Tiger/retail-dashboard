import os
from datetime import timedelta

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api

from db import db
from resources.charts_resource import BarChartOne, BarChartTwo, ScatterChartOne
from resources.user_resource import UserSignin, UserSignUp

app = Flask(__name__)
app.secret_key = "1234"
CORS(app)
api = Api(app)


@app.before_first_request
def create_tables():
    db.create_all()


jwt = JWTManager(app)

app.config["JWT_EXPIRATION_DELTA"] = timedelta(seconds=1800)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URI", "sqlite:///data.db")

# api endpoint for customer signing in the site for the first time
api.add_resource(UserSignUp, "/signup")


# customer login and check for valid customer
api.add_resource(UserSignin, "/signin")

# api for barchart1
api.add_resource(BarChartOne, "/barchartone")

# api for barchart2
api.add_resource(BarChartTwo, "/barcharttwo")

# api for scatterchart
api.add_resource(ScatterChartOne, "/scatterchart")


if __name__ == "__main__":
    db.init_app(app)
    app.run(port=5000)
