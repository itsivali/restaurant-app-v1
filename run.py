import sys
import os
from flask import Flask
from flask_migrate import Migrate
from server import create_app, db

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

app = create_app()
migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
