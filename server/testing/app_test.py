import pytest
from app import app, db
from models import Restaurant, Pizza, RestaurantPizza
from faker import Faker

@pytest.fixture
def test_client():
    with app.app_context():
        with app.test_client() as client:
            yield client

@pytest.fixture
def init_db():
    with app.app_context():
        db.create_all()
        yield db
        db.drop_all()

class TestApp:

    def test_restaurants(self, test_client, init_db):
        fake = Faker()
        restaurant1 = Restaurant(name=fake.name(), address=fake.address())
        restaurant2 = Restaurant(name=fake.name(), address=fake.address())
        db.session.add_all([restaurant1, restaurant2])
        db.session.commit()

        response = test_client.get('/restaurants')
        assert response.status_code == 200
        assert response.content_type == 'application/json'
        response_json = response.get_json()
        assert [restaurant['id'] for restaurant in response_json] == [restaurant1.id, restaurant2.id]
        assert [restaurant['name'] for restaurant in response_json] == [restaurant1.name, restaurant2.name]
        assert [restaurant['address'] for restaurant in response_json] == [restaurant1.address, restaurant2.address]
        for restaurant in response_json:
            assert 'restaurant_pizzas' not in restaurant

    def test_restaurants_id(self, test_client, init_db):
        fake = Faker()
        restaurant = Restaurant(name=fake.name(), address=fake.address())
        db.session.add(restaurant)
        db.session.commit()

        response = test_client.get(f'/restaurants/{restaurant.id}')
        assert response.status_code == 200
        assert response.content_type == 'application/json'
        response_json = response.get_json()
        assert response_json['id'] == restaurant.id
        assert response_json['name'] == restaurant.name
        assert response_json['address'] == restaurant.address
        assert 'restaurant_pizzas' in response_json

    def test_returns_404_if_no_restaurant_to_get(self, test_client, init_db):
        response = test_client.get('/restaurants/0')
        assert response.status_code == 404
        assert response.content_type == 'application/json'
        assert response.get_json().get('error') == "Restaurant not found"

    def test_deletes_restaurant_by_id(self, test_client, init_db):
        fake = Faker()
        restaurant = Restaurant(name=fake.name(), address=fake.address())
        db.session.add(restaurant)
        db.session.commit()

        response = test_client.delete(f'/restaurants/{restaurant.id}')
        assert response.status_code == 204

        result = Restaurant.query.get(restaurant.id)
        assert result is None

    def test_returns_404_if_no_restaurant_to_delete(self, test_client, init_db):
        response = test_client.delete('/restaurants/0')
        assert response.status_code == 404
        assert response.get_json().get('error') == "Restaurant not found"

    def test_pizzas(self, test_client, init_db):
        fake = Faker()
        pizza1 = Pizza(name=fake.name(), ingredients=fake.sentence())
        pizza2 = Pizza(name=fake.name(), ingredients=fake.sentence())
        db.session.add_all([pizza1, pizza2])
        db.session.commit()

        response = test_client.get('/pizzas')
        assert response.status_code == 200
        assert response.content_type == 'application/json'
        response_json = response.get_json()

        pizzas = Pizza.query.all()
        assert [pizza['id'] for pizza in response_json] == [pizza1.id, pizza2.id]
        assert [pizza['name'] for pizza in response_json] == [pizza1.name, pizza2.name]
        assert [pizza['ingredients'] for pizza in response_json] == [pizza1.ingredients, pizza2.ingredients]
        for pizza in response_json:
            assert 'restaurant_pizzas' not in pizza

    def test_creates_restaurant_pizzas(self, test_client, init_db):
        fake = Faker()
        pizza = Pizza(name=fake.name(), ingredients=fake.sentence())
        restaurant = Restaurant(name=fake.name(), address=fake.address())
        db.session.add(pizza)
        db.session.add(restaurant)
        db.session.commit()

        response = test_client.post('/restaurant_pizzas', json={
            "price": 3,
            "pizza_id": pizza.id,
            "restaurant_id": restaurant.id
        })

        assert response.status_code == 201
        assert response.content_type == 'application/json'
        response_json = response.get_json()
        assert response_json['price'] == 3
        assert response_json['pizza_id'] == pizza.id
        assert response_json['restaurant_id'] == restaurant.id
        assert 'id' in response_json
        assert 'pizza' in response_json
        assert 'restaurant' in response_json

        query_result = RestaurantPizza.query.filter_by(
            restaurant_id=restaurant.id, pizza_id=pizza.id).first()
        assert query_result.price == 3

    def test_400_for_validation_error(self, test_client, init_db):
        fake = Faker()
        pizza = Pizza(name=fake.name(), ingredients=fake.sentence())
        restaurant = Restaurant(name=fake.name(), address=fake.address())
        db.session.add(pizza)
        db.session.add(restaurant)
        db.session.commit()

        response = test_client.post('/restaurant_pizzas', json={
            "price": 0,
            "pizza_id": pizza.id,
            "restaurant_id": restaurant.id
        })

        assert response.status_code == 400
        assert response.content_type == 'application/json'
        assert response.get_json().get('errors') == ['validation errors']
