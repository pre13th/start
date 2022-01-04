import settings

SECRET_KEY = getattr(settings, "SECRET_KEY", "localhost")

from pymongo import MongoClient

client = MongoClient(SECRET_KEY, 27017, authSource="admin")
db = client.dbproducts

from flask import Blueprint, jsonify, request

banner_get = Blueprint('banner_get', __name__)

# 배너 랜덤 img
@banner_get.route("/product/banner", methods=["GET"])
def get_banner():
    size_receive = request.args.get('size_give')
    
    banner = []
    coll_arr = db.list_collection_names()
    
    for i in range(0, int(size_receive)):
        banner += list(db[coll_arr[i%5]].aggregate([{"$sample": {"size": 1}}, {"$unset": "_id"}]))

    return jsonify({"result": "success", "documents": banner})
