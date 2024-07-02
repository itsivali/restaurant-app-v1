import os

def generate_env_file():
    # Specify the relative path to the database file
    db_path = 'server/instance/app.db'
    
    env_content = f"""
    # .env file for Flask application
    FLASK_APP=run.py
    FLASK_ENV=development
    SQLALCHEMY_DATABASE_URI=sqlite:///{db_path}
    """
    
    with open('.env', 'w') as env_file:
        env_file.write(env_content.strip())
    
    print(f".env file has been created/updated with path: {db_path}")

if __name__ == "__main__":
    generate_env_file()
