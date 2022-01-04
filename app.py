from datetime import timedelta
from flask import Flask, jsonify, request, render_template,url_for
from werkzeug.utils import redirect
app = Flask(__name__, template_folder="templates")

from routes import *

import settings
SECRET_KEY = getattr(settings, "SECRET_KEY", "localhost")

from pymongo import MongoClient

client = MongoClient(SECRET_KEY, 27017, authSource="admin")
db = client.dbusers

from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app) # PW 암호하

from flask_jwt_extended import (JWTManager,create_access_token,create_refresh_token)
app.config['SECRET_KEY'] = settings.BCRTPY_KEY
app.config['JWT_SECRET_KEY'] = settings.KEY
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)
# app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=15)

jwt = JWTManager(app)


# page
app.register_blueprint(render_page)

# 상품 가져오기 api
app.register_blueprint(product_get)

# 상품 좋아요 api
app.register_blueprint(product_like)

# 삭제 api
app.register_blueprint(product_delete)

# banner 가져오기 
app.register_blueprint(banner_get)



@app.route('/register', methods=['GET','POST'])
def user_register():
    if request.method == 'GET':
        return render_template("create.html")
    else:
        #회원정보 생성
        name_receive = request.form['username_give']
        id_receive = request.form['userid_give']
        pw_receive = request.form['password_give']
        repassword_receive = request.form['repassword_give']
        email_receive = request.form['email_give']
        

        user = db.userdb.find_one({'user_id':  id_receive})

        if user is not None:
            return jsonify({'result' : '사용중인 아이디입니다.'})
        elif not (id_receive and name_receive and pw_receive and repassword_receive and email_receive):
            print(id_receive, name_receive, pw_receive, repassword_receive)
            return jsonify({'result' : '빈칸을 채워주세요.'})
        elif pw_receive != repassword_receive:
            return jsonify({'result' : "비밀번호가 다릅니다."})
        else:  
            pw_hash = bcrypt.generate_password_hash(pw_receive);
            userInfo = {'user_name': name_receive, 'user_id': id_receive, 'user_pw': pw_hash, 'user_email': email_receive }
            db.userdb.insert_one(userInfo)
            return jsonify({'result' : "success"})



# # 임시
# @app.route('/data', methods=['GET'])
# def test_data():
#     pw_hash = bcrypt.generate_password_hash("5555");
#     userInfo = {'user_name': "jin", 'user_id': "won", 'user_pw': pw_hash, 'user_email': "naver@naver.com" }
#     db.userdb.insert_one(userInfo);
#     return jsonify({'result': '성공적으로 추가되었습니다.'})



# 로그인 api 
@app.route('/login', methods=['POST'])
def user_login():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    print(id_receive,pw_receive)

    # user = db.userdb.find_one({'user_id': id_receive},{'_id': False})
    user = db.userdb.find_one({"user_id": id_receive},{'_id': False})
    if user is None:
        return jsonify({'result' : "저희 사이트 회원이 아닙니다."})
    
    pw_hash = user['user_pw']
    print(bcrypt.check_password_hash(pw_hash, pw_receive))

    if bcrypt.check_password_hash(pw_hash, pw_receive) is False:
        return jsonify({'result': '비밀번호가 일치하지 않습니다.'})

    else:
        access_token = create_access_token(identity = id_receive)
        # refresh_token = create_refresh_token(identity = id_receive)
        print(access_token)
        return jsonify({"result": "success", "access_token":access_token})

# access토큰 재발급
# @app.route('/refresh', methods=['POST'])
# @jwt_required(refresh=True)
# def refresh():
#     current_user = get_jwt_identity()
#     access_token = create_access_token(identity=current_user)
#     return jsonify(access_token=access_token, current_user=current_user)

@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    current_user = get_jwt_identity()
    return jsonify({"logged_in_as": current_user}), 200


@app.route('/logout',methods=['GET'])
def logout():
    return redirect('/')


@app.errorhandler(404)
def page_not_found(error):
    app.logger.error(error)
    return render_template("404notfound.html"), 404


if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)
