from flask import request, jsonify
from . import db
from .models import Restaurant, Pizza, RestaurantPizza

def register_routes(app):
    @app.route('/restaurants', methods=['GET'])
    def get_restaurants():
        """Retrieve all restaurants."""
        try:
            restaurants = Restaurant.query.all()
            result = [r.to_dict() for r in restaurants]
            return jsonify(result), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'error': 'Database error'}), 500

    @app.route('/restaurants/<int:id>', methods=['GET'])
    def get_restaurant(id):
        """Retrieve a restaurant by ID."""
        restaurant = Restaurant.query.get(id)
        if not restaurant:
            return jsonify({'error': 'Restaurant not found'}), 404
        return jsonify(restaurant.to_dict()), 200

    @app.route('/restaurants', methods=['POST'])
    def create_restaurant():
        """Create a new restaurant."""
        data = request.get_json()
        name = data.get('name')
        address = data.get('address')

        if not name or not address:
            return jsonify({'error': 'Missing data'}), 400

        try:
            new_restaurant = Restaurant(name=name, address=address)
            db.session.add(new_restaurant)
            db.session.commit()
            return jsonify(new_restaurant.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            print(f"Error creating restaurant: {e}")
            return jsonify({'error': 'Database error'}), 500

    @app.route('/restaurants/<int:id>', methods=['DELETE'])
    def delete_restaurant(id):
        """Delete a restaurant by ID."""
        restaurant = Restaurant.query.get(id)
        if not restaurant:
            return jsonify({'error': 'Restaurant not found'}), 404
        try:
            db.session.delete(restaurant)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            print(f"Error: {e}")
            return jsonify({'error': 'Database error'}), 500

    @app.route('/pizzas', methods=['GET'])
    def get_pizzas():
        """Retrieve all pizzas."""
        try:
            pizzas = Pizza.query.all()
            result = [p.to_dict() for p in pizzas]
            return jsonify(result), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'error': 'Database error'}), 500

    @app.route('/pizzas/<int:id>', methods=['GET'])
    def get_pizza(id):
        """Retrieve a pizza by ID."""
        pizza = Pizza.query.get(id)
        if not pizza:
            return jsonify({'error': 'Pizza not found'}), 404
        return jsonify(pizza.to_dict()), 200

    @app.route('/restaurant_pizzas', methods=['POST'])
    def create_restaurant_pizza():
        """Create a new RestaurantPizza entry."""
        data = request.get_json()
        price = data.get('price')
        pizza_id = data.get('pizza_id')
        restaurant_id = data.get('restaurant_id')

        if price is None or not (1 <= price <= 30):
            return jsonify({'errors': ['Validation error: price must be between 1 and 30']}), 400

        if pizza_id is None or restaurant_id is None:
            return jsonify({'errors': ['Validation error: missing pizza_id or restaurant_id']}), 400

        pizza = Pizza.query.get(pizza_id)
        restaurant = Restaurant.query.get(restaurant_id)

        if not pizza or not restaurant:
            return jsonify({'errors': ['Validation error: invalid pizza_id or restaurant_id']}), 400

        try:
            restaurant_pizza = RestaurantPizza(
                price=price,
                pizza_id=pizza_id,
                restaurant_id=restaurant_id
            )
            db.session.add(restaurant_pizza)
            db.session.commit()
            return jsonify(restaurant_pizza.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            print(f"Error creating restaurant pizza: {e}")
            return jsonify({'error': 'Database error'}), 500
