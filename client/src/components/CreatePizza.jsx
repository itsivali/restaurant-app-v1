import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPizza, getRestaurants } from '../api';
function CreatePizza() {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [restaurantId, setRestaurantId] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await getRestaurants();
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPizza({ name, ingredients, restaurant_id: restaurantId });
            navigate('/pizzas'); 
        } catch (error) {
            console.error('Error creating pizza:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Pizza Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Ingredients:
                <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    required
                />
            </label>
            <label>
                Select Restaurant:
                <select
                    value={restaurantId}
                    onChange={(e) => setRestaurantId(e.target.value)}
                    required
                >
                    <option value="">Select a restaurant</option>
                    {restaurants.map((restaurant) => (
                        <option key={restaurant.id} value={restaurant.id}>
                            {restaurant.name}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit">Create Pizza</button>
        </form>
    );
}

export default CreatePizza;
