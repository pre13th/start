
import settings

SECRET_KEY = getattr(settings, "SECRET_KEY", "localhost")

from pymongo import MongoClient

client = MongoClient(SECRET_KEY, 27017, authSource="admin")
db = client.dbusers

from flask import Blueprint, jsonify, request, render_template
from flask_bcrypt import Bcrypt

user = Blueprint('user', __name__,) # 파일 분리

bcrypt = Bcrypt(user) # PW 암호하

from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, get_jwt_identity, create_refresh_token, jwt_refresh_token_required, get_jti
)

jwt = JWTManager(user)
jwt_blocklist = set()

user.config['JWT_SECRET_KEY'] = settings.KEY
user.config['JWT_ACCESS_TOKEN_EXPIRES'] = settings.ACCESS
user.config['JWT_REFRESH_TOKEN_EXPIRES'] = settings.REFRESH


@user.route('/register', methods=['GET','POST'])
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
        

        user = db.user.find_one({'user_id':  id_receive})

        if user is not None:
            return jsonify({'result' : '사용중인 아이디입니다.'})
        elif not (id_receive and name_receive and pw_receive and repassword_receive and email_receive):
            print(id_receive, name_receive, pw_receive, repassword_receive)
            return jsonify({'result' : '빈칸을 채워주세요.'})
        elif pw_receive != repassword_receive:
            return jsonify({'result' : "비밀번호가 다릅니다."})
        else:  # 모두 입력이 정상적으로 되었다면 밑에명령실행(DB에 입력됨)
            pw_hash = bcrypt.generate_password_hash(pw_receive);
            userInfo = {'user_name': name_receive, 'user_id': id_receive, 'user_pw': pw_hash, 'user_email': email_receive }
            db.user.insert_one(userInfo)
            return jsonify({'result' : "success"})



# 로그인 api 
@user.route('/login', methods=['POST'])
def user_login():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    
    result = db.user.find_one({'user_id': id_receive})
    
    if result is None:
        return jsonify({'result' : "저희 사이트 회원이 아닙니다."})

    result = bcrypt.check_password_hash(result['user_pw'], pw_receive)

    if result:
        access_token = create_access_token(identity = id_receive)
        refresh_token = create_refresh_token(identity = id_receive)

        return jsonify(
			result = "success",
			# 검증된 경우, access 토큰 반환
			access_token = access_token,
            refresh_token = refresh_token),200
    else:
        return jsonify({'result': '비밀번호가 일치하지 않습니다.'})


# JWT 갱신
@user.route('/refresh', methods=['GET'])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    return jsonify(access_token=access_token, current_user=current_user)


# @user.route('/logout',methods=['GET'])
# @jwt_required()
# def logout():
#     jti = get_jti()['jti']
#     jwt_blocklist.add(jti)
#     return render_template("index.html"), jsonify({'result' : 'Log Out'})