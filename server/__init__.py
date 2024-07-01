import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS  

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    config_path = os.path.abspath(os.path.join('server', 'config.py'))
    print(f"Loading configuration from: {config_path}")  
    app.config.from_object('server.config.Config')  
    
    CORS(app, resources={r"/*": {"origins": "*"}})

    db.init_app(app)
    migrate.init_app(app, db)

    from .routes import register_routes
    register_routes(app)

    return app
