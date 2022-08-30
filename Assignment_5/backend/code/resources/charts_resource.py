import json
import sqlite3

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import plotly
import plotly.express as px
from flask_jwt_extended import jwt_required
from flask_restful import Resource

setConnection = sqlite3.connect("data.db")

df = pd.read_sql_query("SELECT * FROM olympics_medals", setConnection)
df.columns = df.columns.str.replace(" ", "")


class BarChartOne(Resource):
    @jwt_required()
    def get(self):
        data1 = df.sort_values(by="total_participations", ascending=False)
        df1 = data1.head(10)
        return {"x": list(df1["countries"]), "y": list(df1["total_participations"])}


class BarChartTwo(Resource):
    @jwt_required()
    def get(self):
        data = df.sort_values(by="winter_total", ascending=False)
        winter_medals = data.head(20)
        return {
            "x": list(winter_medals["countries"]),
            "y1": list(winter_medals["winter_gold"]),
            "y2": list(winter_medals["winter_silver"]),
            "y3": list(winter_medals["winter_bronze"]),
        }


class ScatterChartOne(Resource):
    @jwt_required()
    def get(self):
        return {"x": list(df["total_participations"]), "y": list(df["total_total"])}
