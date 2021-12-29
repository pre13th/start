import settings

SECRET_KEY = getattr(settings, "SECRET_KEY", "localhost")

from pymongo import MongoClient

client = MongoClient(SECRET_KEY, 27017, authSource="admin")
db = client.dbproducts

from flask import Blueprint, jsonify, request
product_delete = Blueprint('product_delete', __name__)


# 상품 삭제
@product_delete.route("/product", methods=["DELETE"])
def delete_product():
    item_receive = request.form["item_give"]
    id_receive = int(request.form["id_give"])
    db[item_receive].delete_one({"id": id_receive})
    return jsonify({"result": "success"})
