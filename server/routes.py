from flask import request, jsonify
from . import db
from .models import Restaurant, Pizza, RestaurantPizza

def register_routes(app):
    # Routes for Restaurant
    @app.route('/restaurants', methods=['GET'])
    def get_restaurants():
        try:
            restaurants = Restaurant.query.all()
            result = [r.to_dict() for r in restaurants]
            return jsonify(result), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'error': 'Database error'}), 500

    @app.route('/restaurants/<int:id>', methods=['GET'])
    def get_restaurant(id):
        restaurant = Restaurant.query.get(id)
        if not restaurant:
            return jsonify({'error': 'Restaurant not found'}), 404
        return jsonify(restaurant.to_dict()), 200

    @app.route('/restaurants', methods=['POST'])
    def create_restaurant():
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

    @app.route('/restaurants/<int:id>', methods=['PUT'])
    def update_restaurant(id):
        data = request.get_json()
        restaurant = Restaurant.query.get(id)
        if not restaurant:
            return jsonify({'error': 'Restaurant not found'}), 404

        name = data.get('name')
        address = data.get('address')

        if name:
            restaurant.name = name
        if address:
            restaurant.address = address

        try:
            db.session.commit()
            return jsonify(restaurant.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            print(f"Error updating restaurant: {e}")
            return jsonify({'error': 'Database error'}), 500

    @app.route('/restaurants/<int:id>', methods=['DELETE'])
    def delete_restaurant(id):
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

    # Routes for Pizza
    @app.route('/pizzas', methods=['GET'])
    def get_pizzas():
        try:
            pizzas = Pizza.query.all()
            result = [p.to_dict() for p in pizzas]
            return jsonify(result), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'error': 'Database error'}), 500

    @app.route('/pizzas/<int:id>', methods=['GET'])
    def get_pizza(id):
        pizza = Pizza.query.get(id)
        if not pizza:
            return jsonify({'error': 'Pizza not found'}), 404
        return jsonify(pizza.to_dict()), 200

    @app.route('/pizzas', methods=['POST'])
    def create_pizza():
        data = request.get_json()
        name = data.get('name')
        ingredients = data.get('ingredients')

        if not name or not ingredients:
            return jsonify({'error': 'Missing data'}), 400

        try:
            new_pizza = Pizza(name=name, ingredients=ingredients)
            db.session.add(new_pizza)
            db.session.commit()
            return jsonify(new_pizza.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            print(f"Error creating pizza: {e}")
            return jsonify({'error': 'Database error'}), 500

    @app.route('/pizzas/<int:id>', methods=['PUT'])
    def update_pizza(id):
        data = request.get_json()
        pizza = Pizza.query.get(id)
        if not pizza:
            return jsonify({'error': 'Pizza not found'}), 404

        name = data.get('name')
        ingredients = data.get('ingredients')

        if name:
            pizza.name = name
        if ingredients:
            pizza.ingredients = ingredients

        try:
            db.session.commit()
            return jsonify(pizza.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            print(f"Error updating pizza: {e}")
            return jsonify({'error': 'Database error'}), 500

    @app.route('/pizzas/<int:id>', methods=['DELETE'])
    def delete_pizza(id):
        pizza = Pizza.query.get(id)
        if not pizza:
            return jsonify({'error': 'Pizza not found'}), 404
        try:
            db.session.delete(pizza)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            print(f"Error: {e}")
            return jsonify({'error': 'Database error'}), 500

    # Routes for RestaurantPizza
    @app.route('/restaurant_pizzas', methods=['POST'])
    def create_restaurant_pizza():
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
