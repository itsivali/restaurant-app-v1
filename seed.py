import sys
import os
from server import create_app, db
from server.models import Restaurant, Pizza, RestaurantPizza

# Ensure the project root is in the Python path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

def seed_data():
    # Create the application instance
    app = create_app()
    
    # Set up the application context
    with app.app_context():
        print("Deleting data...")
        RestaurantPizza.query.delete()
        Pizza.query.delete()
        Restaurant.query.delete()

        print("Creating restaurants...")
        shack = Restaurant(name="Karen's Pizza Shack", address='address1')
        bistro = Restaurant(name="Sanjay's Pizza", address='address2')
        palace = Restaurant(name="Kiki's Pizza", address='address3')
        restaurants = [shack, bistro, palace]

        print("Creating pizzas...")
        cheese = Pizza(name="Emma", ingredients="Dough, Tomato Sauce, Cheese")
        pepperoni = Pizza(name="Geri", ingredients="Dough, Tomato Sauce, Cheese, Pepperoni")
        california = Pizza(name="Melanie", ingredients="Dough, Sauce, Ricotta, Red peppers, Mustard")
        pizzas = [cheese, pepperoni, california]

        print("Creating RestaurantPizza...")
        pr1 = RestaurantPizza(restaurant=shack, pizza=cheese, price=10.0)
        pr2 = RestaurantPizza(restaurant=bistro, pizza=pepperoni, price=15.0)
        pr3 = RestaurantPizza(restaurant=palace, pizza=california, price=20.0)
        restaurant_pizzas = [pr1, pr2, pr3]

        db.session.add_all(restaurants)
        db.session.add_all(pizzas)
        db.session.add_all(restaurant_pizzas)
        db.session.commit()

        print("Seeding done!")

if __name__ == '__main__':
    seed_data()
