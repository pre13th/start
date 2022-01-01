import settings

SECRET_KEY = getattr(settings, "SECRET_KEY", "localhost")

from pymongo import MongoClient

client = MongoClient(SECRET_KEY, 27017, authSource="admin")
db = client.dbproducts

from flask import Blueprint, jsonify

banner_get = Blueprint('banner_get', __name__)

# 배너 랜덤 img
@banner_get.route("/product/banner", methods=["get"])
def get_banner():
    banner = []
    banner += list(db.garland.aggregate([{"$sample": {"size": 4}}, {"$unset": "_id"}]))
    banner += list(db.musicbox.aggregate([{"$sample": {"size": 4}}, {"$unset": "_id"}]))

    return jsonify({"result": "success", "documents": banner})