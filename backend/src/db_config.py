from flask_pymongo import PyMongo

def db_controller(app):
    app.config['MONGO_URI'] = 'mongodb://localhost/blogApp'
    mongo = PyMongo(app)
    db = mongo.db
    return db