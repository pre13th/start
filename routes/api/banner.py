import settings

SECRET_KEY = getattr(settings, "SECRET_KEY", "localhost")

from pymongo import MongoClient

client = MongoClient(SECRET_KEY, 27017, authSource="admin")
db = client.dbproducts

from flask import Blueprint, jsonify

banner_get = Blueprint('banner_get', __name__)

# 배너 랜덤 img
@banner_get.route("/product/banner", methods=["GET"])
def get_banner():
    # size_receive = request.args.get('size_give')
    
    banner = []
<<<<<<< 14
    banner += list(db.garland.aggregate([{"$sample": {"size": 1}}, {"$unset": "_id"}]))
    banner += list(db.light.aggregate([{"$sample": {"size": 1}}, {"$unset": "_id"}]))
    banner += list(db.candle.aggregate([{"$sample": {"size": 1}}, {"$unset": "_id"}]))
    banner += list(db.doll.aggregate([{"$sample": {"size": 1}}, {"$unset": "_id"}]))
    banner += list(db.musicbox.aggregate([{"$sample": {"size": 1}}, {"$unset": "_id"}]))
    banner += list(db.garland.aggregate([{"$sample": {"size": 1}}, {"$unset": "_id"}]))
    banner += list(db.light.aggregate([{"$sample": {"size": 1}}, {"$unset": "_id"}]))
    banner += list(db.candle.aggregate([{"$sample": {"size": 1}}, {"$unset": "_id"}]))
    banner += list(db.doll.aggregate([{"$sample": {"size": 1}}, {"$unset": "_id"}]))
    banner += list(db.musicbox.aggregate([{"$sample": {"size": 1}}, {"$unset": "_id"}]))
    banner += list(db.doll.aggregate([{"$sample": {"size": 1}}, {"$unset": "_id"}]))
    banner += list(db.garland.aggregate([{"$sample": {"size": 1}}, {"$unset": "_id"}]))

    return jsonify({"result": "success", "documents": banner})