from datetime import datetime

from db import db
from sqlalchemy.sql import func


class SalesModel(db.Model):
    __tablename__ = "sales"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, db.ForeignKey("customer.username"))
    product_id = db.Column(db.Integer, db.ForeignKey("product.product_id"))
    sales_amount = db.Column(db.Float(precision=2))
    sale_date = db.Column(db.DateTime)

    customer = db.relationship("CustomerModel")
    product = db.relationship("ProductModel")

    def __init__(self, username, product_id, sales_amount, sale_date):
        self.username = username
        self.product_id = product_id
        self.sales_amount = sales_amount
        self.sale_date = sale_date

    def json(self):
        return {
            "username": self.username,
            "product_id": self.product_id,
            "sales_amount": self.sales_amount,
            "sale_date": str(self.sale_date),
        }

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()  # SELECT * FROM items WHERE name=name LIMIT 1

    @classmethod
    def average_sales_by_date(cls, sale_date):
        sale_date = datetime.fromtimestamp(int(sale_date)).date()
        return (
            cls.query.with_entities(func.avg(cls.sales_amount).label("average"))
            .filter(func.date(cls.sale_date) == sale_date)
            .first()
        )

    @classmethod
    def total_sales_by_date(cls, sale_date):
        sale_date = datetime.fromtimestamp(int(sale_date)).date()
        return (
            cls.query.with_entities(func.sum(cls.sales_amount).label("average"))
            .filter(func.date(cls.sale_date) == sale_date)
            .first()
        )

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
