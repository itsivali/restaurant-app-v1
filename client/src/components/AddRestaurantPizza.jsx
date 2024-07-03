import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AddRestaurantPizza = ({ onAdd }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [pizzas, setPizzas] = useState([]);
    const [restaurantId, setRestaurantId] = useState('');
    const [pizzaId, setPizzaId] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/restaurants');
                const data = await response.json();
                setRestaurants(data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        const fetchPizzas = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/pizzas');
                const data = await response.json();
                setPizzas(data);
            } catch (error) {
                console.error('Error fetching pizzas:', error);
            }
        };

        fetchRestaurants();
        fetchPizzas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/restaurant_pizzas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restaurant_id: restaurantId,
                    pizza_id: pizzaId,
                    price,
                }),
            });

            if (response.ok) {
                const newRestaurantPizza = await response.json();
                toast.success('Restaurant Pizza added successfully!');
                onAdd(newRestaurantPizza);
            } else {
                toast.error('Failed to add Restaurant Pizza.');
            }
        } catch (error) {
            console.error('Error adding Restaurant Pizza:', error);
            toast.error('Failed to add Restaurant Pizza.');
        }
    };

    return (
        <div className="form-container">
            <h1>Add Restaurant Pizza</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Restaurant:
                    <select
                        value={restaurantId}
                        onChange={(e) => setRestaurantId(e.target.value)}
                        required
                    >
                        <option value="">Select Restaurant</option>
                        {restaurants.map((restaurant) => (
                            <option key={restaurant.id} value={restaurant.id}>
                                {restaurant.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Pizza:
                    <select
                        value={pizzaId}
                        onChange={(e) => setPizzaId(e.target.value)}
                        required
                    >
                        <option value="">Select Pizza</option>
                        {pizzas.map((pizza) => (
                            <option key={pizza.id} value={pizza.id}>
                                {pizza.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <div className="form-buttons">
                    <button type="submit" className="small-button">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddRestaurantPizza;
