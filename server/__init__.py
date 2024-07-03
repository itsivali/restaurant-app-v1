from flask import Flask
from flask_cors import CORS
from .models import db
import os

def create_app():
    app = Flask(__name__)
    
    app.config.from_object('server.config.Config')

    db.init_app(app)

    CORS(app, origins=["http://localhost:3000"])

    from .routes import bp as main_bp
    app.register_blueprint(main_bp)

    return app
