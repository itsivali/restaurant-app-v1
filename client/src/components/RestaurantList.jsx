import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

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

        fetchRestaurants();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this restaurant?')) {
            try {
                await fetch(`http://127.0.0.1:5000/restaurants/${id}`, {
                    method: 'DELETE',
                });
                setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
                toast.success('Restaurant deleted successfully!');
            } catch (error) {
                console.error('Error deleting restaurant:', error);
                toast.error('Failed to delete restaurant.');
            }
        }
    };

    return (
        <div className="container">
            <header>
                <nav>
                    <Link to="/restaurants/new">Add New Restaurant</Link>
                </nav>
            </header>
            <div className="card">
                <h1>Restaurants</h1>
                <ul>
                    {restaurants.map(restaurant => (
                        <li key={restaurant.id}>
                            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
                            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RestaurantList;
