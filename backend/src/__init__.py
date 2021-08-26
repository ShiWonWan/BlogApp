from flask import Flask
from flask_cors import CORS
from decouple import config


# Import the blueprints
from blog.routes import blog
from user.routes import user



app = Flask(__name__)
CORS(app)

# Register the blueprint
app.register_blueprint(blog)
app.register_blueprint(user)


if __name__ == '__main__':
    app.run(debug = True)