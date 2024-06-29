from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Restaurant(db.Model):
    __tablename__ = 'restaurants'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)

    # Define a relationship with RestaurantPizza
    restaurant_pizzas = db.relationship('RestaurantPizza', back_populates='restaurant', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'restaurant_pizzas': [rp.to_dict() for rp in self.restaurant_pizzas]
        }

class Pizza(db.Model):
    __tablename__ = 'pizzas'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.String(200), nullable=False)

    # Define a relationship with RestaurantPizza
    restaurant_pizzas = db.relationship('RestaurantPizza', back_populates='pizza', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ingredients': self.ingredients
        }

class RestaurantPizza(db.Model):
    __tablename__ = 'restaurant_pizzas'
    id = db.Column(db.Integer, primary_key=True)
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizzas.id'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)

    # Relationships
    pizza = db.relationship('Pizza', back_populates='restaurant_pizzas')
    restaurant = db.relationship('Restaurant', back_populates='restaurant_pizzas')

    def to_dict(self):
        return {
            'id': self.id,
            'pizza': self.pizza.to_dict(),
            'restaurant': self.restaurant.to_dict(),
            'price': self.price
        }
