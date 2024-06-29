#!/usr/bin/env python3
from flask import Flask, request, jsonify, abort
from flask_migrate import Migrate
from flask_cors import CORS  
from models import db, Restaurant, RestaurantPizza, Pizza

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize CORS
cors = CORS(app, resources={r"/api/*": {"origins": ["http://localhost:4000", "http://127.0.0.1:5555"]}})

migrate = Migrate(app, db)
db.init_app(app)

@app.route("/restaurants", methods=["GET"])
def get_restaurants():
    try:
        restaurants = Restaurant.query.all()
        return jsonify([restaurant.to_dict() for restaurant in restaurants])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/restaurants/<int:id>", methods=["GET"])
def get_restaurant(id):
    try:
        restaurant = Restaurant.query.get(id)
        if not restaurant:
            abort(404, description="Restaurant not found")
        return jsonify(restaurant.to_dict())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/restaurants/<int:id>", methods=["DELETE"])
def delete_restaurant(id):
    try:
        restaurant = Restaurant.query.get(id)
        if not restaurant:
            abort(404, description="Restaurant not found")
        db.session.delete(restaurant)
        db.session.commit()
        return jsonify({"message": "Restaurant deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/pizzas", methods=["GET"])
def get_pizzas():
    try:
        pizzas = Pizza.query.all()
        return jsonify([pizza.to_dict() for pizza in pizzas])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/restaurant_pizzas", methods=["POST"])
def create_restaurant_pizza():
    try:
        data = request.json
        pizza_id = data.get("pizza_id")
        restaurant_id = data.get("restaurant_id")
        price = data.get("price")
        
        # Validate data
        if not (1 <= price <= 30):
            return jsonify({"errors": ["Price must be between 1 and 30"]}), 400
        
        pizza = Pizza.query.get(pizza_id)
        restaurant = Restaurant.query.get(restaurant_id)
        
        if not pizza or not restaurant:
            return jsonify({"errors": ["Pizza or Restaurant not found"]}), 404

        restaurant_pizza = RestaurantPizza(pizza_id=pizza_id, restaurant_id=restaurant_id, price=price)
        db.session.add(restaurant_pizza)
        db.session.commit()
        
        return jsonify(restaurant_pizza.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5555, debug=True)
