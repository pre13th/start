from flask import Flask, render_template, jsonify, request

app = Flask(__name__, template_folder='templates')

import settings

SECRET_KEY = getattr(settings, 'SECRET_KEY', 'localhost')

from pymongo import MongoClient

client = MongoClient(SECRET_KEY, 27017, authSource="admin")
db = client.dbproducts


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/star')
def star():
    return render_template('star.html')


@app.route('/about')
def about():
    return render_template('about.html')


# 상품 GET
@app.route('/product', methods=['GET'])
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
        if sort_receive == 0:
            for coll in coll_arr:
                all_product += list(db[coll].find({}, {'_id': False}))
        else:
            for coll in coll_arr:
                all_product += list(db[coll].find({}, {'_id': False}).sort("like", sort_receive))
        return jsonify({'result': "success", 'documents': all_product})
    else:
        # 하나의 상품 list 전달
        if sort_receive == 0:
            one_product = list(db[item_receive].find({}, {'_id': False}))
        else:
            one_product = list(db[item_receive].find({}, {'_id': False}).sort("like", sort_receive))

        return jsonify({'result': "success", 'documents': one_product})



# 상품 좋아요(+1)
@app.route('/product/like', methods=['POST'])
def post_like():
    item_receive = request.form['item_give']
    id_receive = int(request.form['id_give'])
    target_row = db[item_receive].find_one({'id': id_receive})
    current_like = target_row['like']
    new_like = current_like + 1
    db[item_receive].update_one({'id': id_receive}, {'$set': {'like': new_like}})
    return jsonify({'result': 'success'})

# 상품 삭제
@app.route('/product', methods=['DELETE'])
def delete_product():
    item_receive = request.form['item_give']
    id_receive = int(request.form['id_give'])
    db[item_receive].delete_one({'id': id_receive})
    return jsonify({'result': 'success'})


# 배너 랜덤 img
@app.route('/product/banner', methods=['get'])
def get_banner():
    banner = []
    banner += list(db.garland.aggregate([{'$sample': {'size': 3}}, {"$unset": "_id"}]))
    banner += list(db.musicbox.aggregate([{'$sample': {'size': 3}}, {"$unset": "_id"}]))

    return jsonify({'result': 'success', 'documents': banner})


@app.errorhandler(404)
def page_not_found(error):
    app.logger.error(error)
    return render_template('404notfound.html'), 404


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
