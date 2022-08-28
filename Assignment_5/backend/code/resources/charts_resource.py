import json

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import plotly
import plotly.express as px
from flask_jwt_extended import jwt_required
from flask_restful import Resource


class BarChartOne(Resource):
    df = pd.read_csv("olympics_medals_country_wise.csv", thousands=",")
    df.columns = df.columns.str.replace(" ", "")

    @jwt_required()
    def get(self):
        participation_total = self.df.nlargest(10, ["total_participation"]).melt(
            id_vars=[
                "countries",
                "ioc_code",
                "summer_participations",
                "summer_gold",
                "summer_silver",
                "summer_bronze",
                "summer_total",
                "winter_participations",
                "winter_gold",
                "winter_silver",
                "winter_bronze",
                "winter_total",
                "total_gold",
                "total_silver",
                "total_bronze",
                "total_total",
            ],
            var_name="participation",
            value_name="participation_total",
        )
        c_list = participation_total["countries"].to_list()
        # print(c_list)
        p_list = participation_total["participation_total"].to_list()
        x = c_list
        y = p_list
        return {"x": x, "y": y}


class BarChartTwo(Resource):
    df = pd.read_csv("olympics_medals_country_wise.csv", thousands=",")
    df.columns = df.columns.str.replace(" ", "")

    @jwt_required()
    def get(self):
        data = self.df.sort_values(by="winter_total", ascending=False)
        winter_medals = data.head(20)
        return {
            "x": list(winter_medals["countries"]),
            "y1": list(winter_medals["winter_gold"]),
            "y2": list(winter_medals["winter_silver"]),
            "y3": list(winter_medals["winter_bronze"]),
        }


class ScatterChartOne(Resource):
    df = pd.read_csv("olympics_medals_country_wise.csv", thousands=",")
    df.columns = df.columns.str.replace(" ", "")

    @jwt_required()
    def get(self):
        return {"x": list(self.df["total_participation"]), "y": list(self.df["total_total"])}
