from flask_jwt_extended import (
    jwt_required,get_jwt_identity
)

import settings

SECRET_KEY = getattr(settings, "SECRET_KEY", "localhost")

from pymongo import MongoClient

client = MongoClient(SECRET_KEY, 27017, authSource="admin")
db = client.dbproducts

from flask import Blueprint, jsonify, request

product_get = Blueprint('product_get', __name__,)


# 상품 GET
@product_get.route('/product', methods=['GET'])
@jwt_required()
def get_product():
    item_receive = request.args.get('item_give')

    try:
        sort_receive = int(request.args.get('sort_give'))
    except:
        sort_receive = 0

    if item_receive == 'all':
        # 모든 상품의 list 전달
        coll_arr = db.list_collection_names()
        all_product = []
        for coll in coll_arr:
            all_product += list(db[coll].find({}, {'_id': False}))

        if sort_receive == 1:
            all_product = sorted(
                all_product, key=lambda product: product["like"])
        elif sort_receive == -1:
            all_product = sorted(
                all_product, key=lambda product: product["like"], reverse=True)

        return jsonify({'result': "success", 'documents': all_product})
    else:
        # 하나의 상품 list 전달
        if sort_receive == 0:
            one_product = list(db[item_receive].find({}, {'_id': False}))
        else:
            one_product = list(db[item_receive].find(
                {}, {'_id': False}).sort("like", sort_receive))

        return jsonify({'result': "success", 'documents': one_product})
