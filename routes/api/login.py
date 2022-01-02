

import settings

SECRET_KEY = getattr(settings, "SECRET_KEY", "localhost")

from pymongo import MongoClient

client = MongoClient(SECRET_KEY, 27017, authSource="admin")
db = client.dbusers

from flask import Blueprint, jsonify, request, render_template
from flask_bcrypt import Bcrypt

user = Blueprint('user', __name__,) # 파일 분리
bcrypt = Bcrypt(user) # PW 암호하



@user.route('/register', methods=['GET','POST'])
def user_register():
    if request.method == 'GET':
        return render_template("register.html")
    else:
        #회원정보 생성
        name_receive = request.form['username_give']
        id_receive = request.form['userid_give']
        pw_receive = request.form['password_give']
        repassword_receive = request.form['repassword_give']
        email_receive = request.form['email_give']
        

        user = db.users.find_one({'user_id':  id_receive})

        if user is not None:
            return jsonify({'msg' : '사용중인 아이디입니다.'})
        elif not (id_receive and name_receive and pw_receive and repassword_receive):
            print(id_receive, name_receive, pw_receive, repassword_receive)
            return jsonify({'msg' : '빈칸을 채워주세요.'})
        elif pw_receive != repassword_receive:
            return jsonify({'msg' : "비밀번호가 다릅니다."})
        else:  # 모두 입력이 정상적으로 되었다면 밑에명령실행(DB에 입력됨)
            pw_hash = bcrypt.generate_password_hash(pw_receive);
            userInfo = {'user_name': name_receive, 'user_id': id_receive, 'user_pw': pw_hash, 'user_email': email_receive }
            db.users.insert_one(userInfo)
            return jsonify({'msg' : "success"})



