from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS  

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # Configure the app
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Initialize CORS with specific origins
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    
    # Register routes
    from .routes import register_routes
    register_routes(app)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    return app
