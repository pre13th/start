from pymongo import MongoClient
import settings
from flask import Flask, render_template, jsonify, request

app = Flask(__name__, template_folder='templates')


SECRET_KEY = getattr(settings, 'SECRET_KEY', 'localhost')


client = MongoClient(SECRET_KEY, 27017)
db = client.dbproducts

# 하나의 데이터베이스의 모든 컬렉션들의 이름을 배열로 출력
print(db.list_collection_names())
# same_ages = list(db.products.find({}, {'_id': False, 'desc': False, 'title': False, 'price': False, 'like': False, 'review': False}))

# temp = list(db.garland.aggregate([{'$sample': {'size': 4}}, {"$unset": "_id"}]))
temp = list(db.garland.aggregate([{'$sample': {'size': 4}}]))


print(bool(1))
