from flask import Blueprint, jsonify, request
from datetime import datetime
from flask_pymongo import MongoClient, ObjectId


# PyMongo config
connection_str = 'mongodb://localhost/'
client = MongoClient(connection_str)
db = client.blogApp.blog

# BLUEPRINT CONFIGS
blog = Blueprint('blog', __name__, url_prefix='/blog')

# Create a new blog /blog/new
@blog.route('/new', methods=['POST'])
def newBlog():
    id = db.insert_one({
        'name' : request.json['name'],
        'text' : request.json['text'],
        'date' : datetime.today()
    })

    return jsonify({'_id' : str(ObjectId(id.inserted_id))})

# Get all blogs /blog/get
@blog.route('/get')
def getAll():
    docs = []

    for doc in db.find():
        docs.append({
            'name' : doc['name'],
            'text' : doc['text'],
            'date' : doc['date'],
            '_id' : str(ObjectId(doc['_id']))
        })

    return jsonify(docs)

# Get one blog
@blog.route('/get/<id>')
def getOne(id):
    blog = db.find_one({'_id' : ObjectId(id)})
    if not blog:
        return jsonify({"ERROR":1})
    else:
        del blog["_id"]
        return jsonify(blog)

# Delete one blog
@blog.route('/delete/<id>', methods=['DELETE'])
def deleteOne(id):
    db.delete_one({'_id' : ObjectId(id)})
    reponse = jsonify({f'_id {id}' : 'deleted ok'})
    reponse.status_code = 200
    return reponse