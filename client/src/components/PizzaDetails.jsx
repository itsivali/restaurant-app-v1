import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPizza, getPizzaRestaurants } from '../api';

function PizzaDetails() {
    const { id } = useParams();
    const [pizza, setPizza] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const response = await getPizza(id);
                setPizza(response.data);
            } catch (error) {
                console.error('Error fetching pizza:', error);
                setError('Error fetching pizza.');
            }
        };

        const fetchRestaurants = async () => {
            try {
                const response = await getPizzaRestaurants(id);
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants for pizza:', error);
                setError('Error fetching restaurants for pizza.');
            }
        };

        fetchPizza();
        fetchRestaurants();
    }, [id]);

    return (
        <div>
            <h2>Pizza Details</h2>
            {error && <p>{error}</p>}
            {pizza && (
                <div>
                    <h3>{pizza.name}</h3>
                    <p>Ingredients: {pizza.ingredients}</p>
                    <h4>Restaurants:</h4>
                    <ul>
                        {restaurants.length > 0 ? (
                            restaurants.map((restaurant) => (
                                <li key={restaurant.id}>{restaurant.name}</li>
                            ))
                        ) : (
                            <p>No restaurants serve this pizza.</p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PizzaDetails;
