from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
CORS(app, resources={r"/*": {"origins": ["http://localhost:4000", "http://127.0.0.1:5555"]}})

# Import routes
from routes import *

if __name__ == '__main__':
    app.run(debug=True)
