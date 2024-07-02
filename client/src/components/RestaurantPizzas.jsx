import React, { useState } from 'react';
import { createRestaurantPizza } from '../api';

function RestaurantPizzas() {
    const [price, setPrice] = useState('');
    const [pizzaId, setPizzaId] = useState('');
    const [restaurantId, setRestaurantId] = useState('');

    const handleCreateRestaurantPizza = async () => {
        try {
            const newRestaurantPizza = { price, pizza_id: pizzaId, restaurant_id: restaurantId };
            await createRestaurantPizza(newRestaurantPizza);
            // Handle success (e.g., display a message or refresh data)
        } catch (error) {
            console.error('Error creating restaurant pizza:', error);
        }
    };

    return (
        <div>
            <h2>Create Restaurant Pizza</h2>
            <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Pizza ID"
                value={pizzaId}
                onChange={e => setPizzaId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Restaurant ID"
                value={restaurantId}
                onChange={e => setRestaurantId(e.target.value)}
            />
            <button onClick={handleCreateRestaurantPizza}>Create</button>
        </div>
    );
}

export default RestaurantPizzas;
