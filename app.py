from flask import Flask, render_template, jsonify, request
app = Flask(__name__, template_folder='templates')

import settings
SECRET_KEY = getattr(settings, 'SECRET_KEY', 'localhost')


from pymongo import MongoClient
client = MongoClient(SECRET_KEY, 27017, authSource="admin")
db = client.dbtest1

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/star')
def star():


    return render_template('star.html')

@app.route('/about')
def about():


    return render_template('about.html')


@app.route('/order', methods=['GET'])
def gift_order():
    Xmas_gift = list(db.products.find({},{'_id':False}).sort('like', -1))
    return jsonify({'gift_order':Xmas_gift})


@app.errorhandler(404)
def page_not_found(error):
    app.logger.error(error)
    return render_template('404notfound.html'), 404


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)