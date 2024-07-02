import React, { useState, useEffect } from 'react';
import { getRestaurants, createRestaurant } from '../api';

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await getRestaurants();
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleCreateRestaurant = async () => {
    try {
      const newRestaurant = { name, address };
      await createRestaurant(newRestaurant);
      fetchRestaurants();
    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
  };

  return (
    <div>
      <h2>Restaurants</h2>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>{restaurant.name} - {restaurant.address}</li>
        ))}
      </ul>
      <h2>Create Restaurant</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <button onClick={handleCreateRestaurant}>Create</button>
    </div>
  );
}

export default Restaurants;
