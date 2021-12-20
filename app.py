from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

import settings
SECRET_KEY = getattr(settings, 'SECRET_KEY', 'localhost')

from pymongo import MongoClient
client = MongoClient(SECRET_KEY, 27017)
db = client.dbcookie

## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)