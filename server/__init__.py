from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
from .config import Config 

db = SQLAlchemy()

def create_app():
    load_dotenv() 
    app = Flask(__name__)
    app.config.from_object(Config) 
    db.init_app(app)
    CORS(app)
    
    with app.app_context():
        from .routes import register_routes
        register_routes(app)
    
    return app
