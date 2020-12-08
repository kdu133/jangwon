from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request, session
import bcrypt
from datetime import datetime
from bson.objectid import ObjectId

client = MongoClient('localhost', 27017)
# client = MongoClient('mongodb://test:test@localhost', 27017)
db = client.jangwon
app = Flask(__name__)
app.secret_key = "secretsecret"

# HTML 화면 보여주기
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/myPage')
def myPage():
    return render_template('mypage.html')

# 삼행시 CRUD API
@app.route('/sam/create', methods=['POST'])
def create_sam():
    first_receive = request.form['first_give']
    second_receive = request.form['second_give']
    third_receive = request.form['third_give']
    user_id_receive = request.form['user_id_give']
    date = datetime.today().strftime("%Y%m%d")
    like = []

    sam = {'first': first_receive, 'second': second_receive,
           'third': third_receive, 'user_id': user_id_receive,
           'date': date, 'like': like
           }

    db.sam.insert_one(sam)

    return jsonify({'result': 'success'})

@app.route('/sam/read', methods=['GET'])
def read_sam():
    today = datetime.today().strftime("%Y%m%d")
    sams = list(db.sam.find({'date':today}))
    for sam in sams:
        sam['_id'] = str(sam['_id'])

    return jsonify({'result': 'success', 'sam_list': sams})

@app.route('/sam/delete', methods=['POST'])
def delete_sam():
    id_receive = request.form['id_give']
    db.sam.delete_one({'_id': ObjectId(id_receive)})
    return jsonify({'result': 'success'})


@app.route('/rank/read', methods=['GET'])
def read_rank():
    today = datetime.today().strftime("%Y%m%d")
    # ranks = list(db.sam.find({'date': today}).sort({''}))
    return jsonify({'result': 'success'})

@app.route('/user/create', methods=['POST'])
def create():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    value = db.user.find_one({'id': id_receive})
    if value is None:
        createOne = {'id': id_receive, 'pw': pw_receive}
        db.user.insert_one(createOne)
        return jsonify({'result': 'success'})
    return jsonify({'result': 'fail'})

@app.route('/user/login', methods=['POST'])
def login_user():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    user = db.user.find_one({'id': id_receive})
    if user is None or user['pw'] != pw_receive:
        return jsonify({'result': 'fail'})
    session['id'] = user['id']
    return jsonify({'result': 'success'})

@app.route('/user/logout', methods=['GET'])
def logout_user():
    session.clear()
    return jsonify({'result': 'success'})

@app.route('/idcheck', methods=["GET"])
def user_only():
    if 'id' in session:
        id = session['id']
    else:
        id = '없음'
    return jsonify({'result': 'success', 'id': id})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
