from db import db


class ProductModel(db.Model):
    __tablename__ = "product"

    product_id = db.Column(db.String, primary_key=True)
    product = db.Column(db.String(80))
    description = db.Column(db.String(100))

    sales = db.relationship("SalesModel", lazy="dynamic")

    def __init__(self, product_id, product, description):
        self.product_id = product_id
        self.product = product
        self.description = description

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_product_id(cls, product_id):
        return cls.query.filter_by(product=product_id).first()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
