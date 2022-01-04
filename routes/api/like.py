from flask_jwt_extended import (
    jwt_required,get_jwt_identity
)
import settings

SECRET_KEY = getattr(settings, "SECRET_KEY", "localhost")

from pymongo import MongoClient

client = MongoClient(SECRET_KEY, 27017, authSource="admin")
db = client.dbproducts

from flask import Blueprint, jsonify, request

product_like = Blueprint('product_like', __name__)


# 상품 좋아요(+1)
@product_like.route("/product/like", methods=["POST"])
@jwt_required()
def post_like():
    item_receive = request.form["item_give"]
    id_receive = int(request.form["id_give"])
    target_row = db[item_receive].find_one({"id": id_receive})
    current_like = target_row["like"]
    new_like = current_like + 1
    db[item_receive].update_one({"id": id_receive}, {"$set": {"like": new_like}})
    return jsonify({"result": "success"})
