import csv

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, MetaData, String, Table, create_engine

db = SQLAlchemy()

engine = create_engine("sqlite:///data.db", echo=True)

metadata = MetaData()
# Define the table with sqlalchemy:
olympics_medals = Table(
    "olympics_medals",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("countries", String(200)),
    Column("ioc_code", String(50)),
    Column("summer_participations", Integer),
    Column("summer_gold", Integer),
    Column("summer_silver", Integer),
    Column("summer_bronze", Integer),
    Column("summer_total", Integer),
    Column("winter_participations", Integer),
    Column("winter_gold", Integer),
    Column("winter_silver", Integer),
    Column("winter_bronze", Integer),
    Column("winter_total", Integer),
    Column("total_participations", Integer),
    Column("total_gold", Integer),
    Column("total_silver", Integer),
    Column("total_bronze", Integer),
    Column("total_total", Integer),
)
metadata.create_all(engine)
insert_query = olympics_medals.insert()


with open("olympics_medals.csv", "r", encoding="utf-8") as csvfile:
    csv_reader = csv.reader(csvfile, delimiter=",")
    engine.execute(
        insert_query,
        [
            {
                "countries": row[0],
                "ioc_code": row[1],
                "summer_participations": row[2],
                "summer_gold": row[3],
                "summer_silver": row[4],
                "summer_bronze": row[5],
                "summer_total": row[6],
                "winter_participations": row[7],
                "winter_gold": row[8],
                "winter_silver": row[9],
                "winter_bronze": row[10],
                "winter_total": row[11],
                "total_participations": row[12],
                "total_gold": row[13],
                "total_silver": row[14],
                "total_bronze": row[15],
                "total_total": row[16],
            }
            for row in csv_reader
        ],
    )
