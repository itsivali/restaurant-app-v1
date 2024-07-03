from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    
    pizzas = db.relationship('Pizza', secondary='restaurant_pizza', back_populates='restaurants')
    restaurant_pizzas = db.relationship('RestaurantPizza', back_populates='restaurant')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address
        }

class Pizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.String(200), nullable=False)

    restaurants = db.relationship('Restaurant', secondary='restaurant_pizza', back_populates='pizzas')
    restaurant_pizzas = db.relationship('RestaurantPizza', back_populates='pizza')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ingredients': self.ingredients
        }

class RestaurantPizza(db.Model):
    __tablename__ = 'restaurant_pizza'
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), primary_key=True)
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id'), primary_key=True)
    price = db.Column(db.Float, nullable=False)

    restaurant = db.relationship('Restaurant', back_populates='restaurant_pizzas')
    pizza = db.relationship('Pizza', back_populates='restaurant_pizzas')

    def to_dict(self):
        return {
            'restaurant_id': self.restaurant_id,
            'pizza_id': self.pizza_id,
            'price': self.price
        }
