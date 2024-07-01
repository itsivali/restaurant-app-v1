from . import db

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(250), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address
        }

class Pizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    ingredients = db.Column(db.String(250), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ingredients': self.ingredients
        }

class RestaurantPizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id'), nullable=False)
    price = db.Column(db.Integer, nullable=False)

    restaurant = db.relationship('Restaurant', backref=db.backref('restaurant_pizzas', lazy=True))
    pizza = db.relationship('Pizza', backref=db.backref('restaurant_pizzas', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'pizza_id': self.pizza_id,
            'price': self.price
        }
