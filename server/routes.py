from flask import request, jsonify
from . import db
from .models import Restaurant, Pizza, RestaurantPizza

def register_routes(app):
    @app.route('/restaurants', methods=['GET'])
    def get_restaurants():
        """Retrieve all restaurants."""
        try:
            restaurants = Restaurant.query.all()
            result = [{
                'id': r.id,
                'name': r.name,
                'address': r.address
            } for r in restaurants]
            return jsonify(result), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'error': 'Database error'}), 500

    @app.route('/restaurants/<int:id>', methods=['GET'])
    def get_restaurant(id):
        """Retrieve a restaurant by ID."""
        restaurant = Restaurant.query.get(id)
        if restaurant is None:
            return jsonify({'error': 'Restaurant not found'}), 404
        result = {
            'id': restaurant.id,
            'name': restaurant.name,
            'address': restaurant.address,
            'restaurant_pizzas': [{
                'id': rp.id,
                'price': rp.price,
                'pizza': {
                    'id': rp.pizza.id,
                    'name': rp.pizza.name,
                    'ingredients': rp.pizza.ingredients
                }
            } for rp in restaurant.restaurant_pizzas]
        }
        return jsonify(result), 200

    @app.route('/restaurants/<int:id>', methods=['DELETE'])
    def delete_restaurant(id):
        """Delete a restaurant by ID."""
        restaurant = Restaurant.query.get(id)
        if restaurant is None:
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
            result = [{
                'id': p.id,
                'name': p.name,
                'ingredients': p.ingredients
            } for p in pizzas]
            return jsonify(result), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'error': 'Database error'}), 500

    @app.route('/pizzas/<int:id>', methods=['GET'])
    def get_pizza(id):
        """Retrieve a pizza by ID."""
        pizza = Pizza.query.get(id)
        if pizza is None:
            return jsonify({'error': 'Pizza not found'}), 404
        result = {
            'id': pizza.id,
            'name': pizza.name,
            'ingredients': pizza.ingredients
        }
        return jsonify(result), 200

    @app.route('/restaurant_pizzas', methods=['POST'])
    def create_restaurant_pizza():
        """Create a new RestaurantPizza entry."""
        data = request.get_json()
        price = data.get('price')
        pizza_id = data.get('pizza_id')
        restaurant_id = data.get('restaurant_id')

        if price is None or not (1 <= price <= 30):
            return jsonify({'errors': ['validation errors']}), 400

        if pizza_id is None or restaurant_id is None:
            return jsonify({'errors': ['validation errors']}), 400

        pizza = Pizza.query.get(pizza_id)
        restaurant = Restaurant.query.get(restaurant_id)

        if pizza is None or restaurant is None:
            return jsonify({'errors': ['validation errors']}), 400

        try:
            restaurant_pizza = RestaurantPizza(
                price=price,
                pizza_id=pizza_id,
                restaurant_id=restaurant_id
            )
            db.session.add(restaurant_pizza)
            db.session.commit()
            result = {
                'id': restaurant_pizza.id,
                'price': restaurant_pizza.price,
                'pizza_id': restaurant_pizza.pizza_id,
                'restaurant_id': restaurant_pizza.restaurant_id,
                'pizza': {
                    'id': pizza.id,
                    'name': pizza.name,
                    'ingredients': pizza.ingredients
                },
                'restaurant': {
                    'id': restaurant.id,
                    'name': restaurant.name,
                    'address': restaurant.address
                }
            }
            return jsonify(result), 201
        except Exception as e:
            db.session.rollback()
            print(f"Error: {e}")
            return jsonify({'error': 'Database error'}), 500
