from flask import Blueprint, jsonify, request, abort
from flask_pymongo import ObjectId, MongoClient
from jwt import encode
from datetime import datetime, timedelta
import hashlib

# PyMongo config
connection_str = 'mongodb://localhost/'
client = MongoClient(connection_str)
db = client.blogApp.user

# Hashing
def hash_str(str):
    return hashlib.sha256(str.encode()).hexdigest()

# BLUEPRINT CONFIGS
user = Blueprint('user', __name__, url_prefix='/user')

# If user exist
def existing_user(user):
    return True if db.find_one({'user' : user}) else False


# Create a new user
@user.route('/new', methods=['POST'])
def newUser():

    # Catching the values
    user = request.json["user"]
    password = hash_str(request.json["password"])
    name = request.json["name"]

    # User comprobations
    if user == None or password == None or name == None or user == '' or request.json["password"] == '' or name == '':
        abort(400) # Missing values
    if existing_user(user):
        abort(400) # User exist
    
    # User registration
    id = db.insert_one({
        "user" : user,
        "password" : password,
        "date" : datetime.today(),
        "name" : name
    })

    return jsonify({'_id' : str(ObjectId(id.inserted_id))})

# Login
@user.route('/login', methods=['POST'])
def login():

    # Catching the values
    user = request.json["user"]
    password = hash_str(request.json["password"])

    # User comprobations
    if user == None == password == None or user == '' or request.json["password"] == '':
        abort(400) # Missing values
    if not existing_user(user):
        abort(400) # User not exist

    user_values = db.find_one({'user' : user})
    if user_values["password"] != password:
        return jsonify({'login' : False})
    else:
        access_token = encode({
            "user" : user_values["user"], 
            "name" : user_values["name"],
            "_id" : str(ObjectId(user_values["_id"])),
        }, "ss", algorithm="HS256")
    
    return jsonify({'login' : True, 'token' : access_token})