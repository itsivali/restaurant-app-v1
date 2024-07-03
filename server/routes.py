from flask import Blueprint, jsonify, request, abort
from .models import db, Restaurant, Pizza, RestaurantPizza

bp = Blueprint('main', __name__)

@bp.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify([restaurant.to_dict() for restaurant in restaurants])

@bp.route('/restaurants/<int:id>', methods=['GET'])
def get_restaurant(id):
    restaurant = Restaurant.query.get(id)
    if restaurant is None:
        abort(404, description="Restaurant not found")
    return jsonify(restaurant.to_dict())

@bp.route('/restaurants', methods=['POST'])
def create_restaurant():
    data = request.get_json()
    if not data or 'name' not in data or 'address' not in data:
        abort(400, description="Invalid input")
    restaurant = Restaurant(name=data['name'], address=data['address'])
    db.session.add(restaurant)
    db.session.commit()
    return jsonify(restaurant.to_dict()), 201

@bp.route('/restaurants/<int:id>', methods=['PUT'])
def update_restaurant(id):
    restaurant = Restaurant.query.get(id)
    if restaurant is None:
        abort(404, description="Restaurant not found")
    
    data = request.get_json()
    if not data:
        abort(400, description="Invalid input")
    
    if 'name' in data:
        restaurant.name = data['name']
    if 'address' in data:
        restaurant.address = data['address']
    
    db.session.commit()
    return jsonify(restaurant.to_dict())

@bp.route('/restaurants/<int:id>', methods=['DELETE'])
def delete_restaurant(id):
    restaurant = Restaurant.query.get(id)
    if restaurant is None:
        abort(404, description="Restaurant not found")
    
    db.session.delete(restaurant)
    db.session.commit()
    return jsonify({'message': 'Restaurant deleted'}), 204

@bp.route('/pizzas', methods=['GET'])
def get_pizzas():
    pizzas = Pizza.query.all()
    return jsonify([pizza.to_dict() for pizza in pizzas])

@bp.route('/pizzas/<int:id>', methods=['GET'])
def get_pizza(id):
    pizza = Pizza.query.get(id)
    if pizza is None:
        abort(404, description="Pizza not found")
    return jsonify(pizza.to_dict())

@bp.route('/pizzas', methods=['POST'])
def create_pizza():
    data = request.get_json()
    if not data or 'name' not in data or 'ingredients' not in data:
        abort(400, description="Invalid input")
    pizza = Pizza(name=data['name'], ingredients=data['ingredients'])
    db.session.add(pizza)
    db.session.commit()
    return jsonify(pizza.to_dict()), 201

@bp.route('/pizzas/<int:id>', methods=['PUT'])
def update_pizza(id):
    pizza = Pizza.query.get(id)
    if pizza is None:
        abort(404, description="Pizza not found")
    
    data = request.get_json()
    if not data:
        abort(400, description="Invalid input")
    
    if 'name' in data:
        pizza.name = data['name']
    if 'ingredients' in data:
        pizza.ingredients = data['ingredients']
    
    db.session.commit()
    return jsonify(pizza.to_dict())

@bp.route('/pizzas/<int:id>', methods=['DELETE'])
def delete_pizza(id):
    pizza = Pizza.query.get(id)
    if pizza is None:
        abort(404, description="Pizza not found")
    
    db.session.delete(pizza)
    db.session.commit()
    return jsonify({'message': 'Pizza deleted'}), 204

@bp.route('/restaurant_pizzas', methods=['GET'])
def get_restaurant_pizzas():
    restaurant_pizzas = RestaurantPizza.query.all()
    return jsonify([rp.to_dict() for rp in restaurant_pizzas])

@bp.route('/restaurant_pizzas', methods=['POST'])
def create_restaurant_pizza():
    data = request.get_json()
    if not data or 'restaurant_id' not in data or 'pizza_id' not in data or 'price' not in data:
        abort(400, description="Invalid input")
    
    restaurant_pizza = RestaurantPizza(
        restaurant_id=data['restaurant_id'],
        pizza_id=data['pizza_id'],
        price=data['price']
    )
    db.session.add(restaurant_pizza)
    db.session.commit()
    return jsonify(restaurant_pizza.to_dict()), 201

@bp.route('/restaurant_pizzas/<int:restaurant_id>/<int:pizza_id>', methods=['PUT'])
def update_restaurant_pizza(restaurant_id, pizza_id):
    restaurant_pizza = RestaurantPizza.query.filter_by(
        restaurant_id=restaurant_id,
        pizza_id=pizza_id
    ).first()
    
    if restaurant_pizza is None:
        abort(404, description="Restaurant-Pizza association not found")
    
    data = request.get_json()
    if not data or 'price' not in data:
        abort(400, description="Invalid input")
    
    restaurant_pizza.price = data['price']
    db.session.commit()
    return jsonify(restaurant_pizza.to_dict())

@bp.route('/restaurant_pizzas/<int:restaurant_id>/<int:pizza_id>', methods=['DELETE'])
def delete_restaurant_pizza(restaurant_id, pizza_id):
    restaurant_pizza = RestaurantPizza.query.filter_by(
        restaurant_id=restaurant_id,
        pizza_id=pizza_id
    ).first()
    
    if restaurant_pizza is None:
        abort(404, description="Restaurant-Pizza association not found")
    
    db.session.delete(restaurant_pizza)
    db.session.commit()
    return jsonify({'message': 'Restaurant-Pizza association deleted'}), 204
