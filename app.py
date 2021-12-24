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


@app.route('/product/garland', methods=['GET'])
def get_garland():
    garland = list(db.garland.find({}, {'_id': False}))
    return jsonify({'result': "success", 'documents': garland})


@app.route('/product/like', methods=['POST'])
def post_like():
    id_receive = request.form['id_give']
    target_row = db.garland.find_one({'id': id_receive})
    current_like = target_row['like']
    new_like = current_like + 1
    db.garland.update_one({'id': id_receive}, {'$set': {'like': new_like}})
    return jsonify({'result': 'success'})


@app.errorhandler(404)
def page_not_found(error):
    app.logger.error(error)
    return render_template('404notfound.html'), 404


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)
