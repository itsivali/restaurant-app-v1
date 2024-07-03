import React, { useState, useEffect } from 'react';
import './RestaurantPizzaList.css';
import AddRestaurantPizza from './AddRestaurantPizza';

const RestaurantPizzaList = () => {
    const [restaurantPizzas, setRestaurantPizzas] = useState([]);
    const [pizzas, setPizzas] = useState({});
    const [restaurants, setRestaurants] = useState({});

    useEffect(() => {
        const fetchRestaurantPizzas = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/restaurant_pizzas');
                const data = await response.json();
                setRestaurantPizzas(data);
            } catch (error) {
                console.error('Error fetching restaurant-pizza data:', error);
            }
        };

        const fetchPizzas = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/pizzas');
                const data = await response.json();
                const pizzaMap = data.reduce((acc, pizza) => {
                    acc[pizza.id] = pizza;
                    return acc;
                }, {});
                setPizzas(pizzaMap);
            } catch (error) {
                console.error('Error fetching pizza data:', error);
            }
        };

        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/restaurants');
                const data = await response.json();
                const restaurantMap = data.reduce((acc, restaurant) => {
                    acc[restaurant.id] = restaurant;
                    return acc;
                }, {});
                setRestaurants(restaurantMap);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        };

        fetchRestaurantPizzas();
        fetchPizzas();
        fetchRestaurants();
    }, []);

    const handleAddRestaurantPizza = (newRestaurantPizza) => {
        setRestaurantPizzas((prev) => [...prev, newRestaurantPizza]);
    };

    return (
        <div className="table-container">
            <h1>Restaurant-Pizza Relationships</h1>
            <AddRestaurantPizza onAdd={handleAddRestaurantPizza} />
            <table>
                <thead>
                    <tr>
                        <th>Restaurant Name</th>
                        <th>Pizza Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurantPizzas.map((rp) => (
                        <tr key={`${rp.restaurant_id}-${rp.pizza_id}`}>
                            <td>{restaurants[rp.restaurant_id]?.name || 'Loading...'}</td>
                            <td>{pizzas[rp.pizza_id]?.name || 'Loading...'}</td>
                            <td>${rp.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantPizzaList;
