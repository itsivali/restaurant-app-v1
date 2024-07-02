import React from 'react';
import { useParams, useHistory } from 'react-router-dom'; // Updated import
import axios from 'axios';

const RestaurantDetails = () => {
    const { id } = useParams();
    const history = useHistory(); // Updated to useHistory
    const [restaurant, setRestaurant] = React.useState(null);

    React.useEffect(() => {
        axios.get(`/restaurants/${id}`)
            .then(response => setRestaurant(response.data))
            .catch(error => console.error('Error fetching restaurant:', error));
    }, [id]);

    const handleDelete = () => {
        axios.delete(`/restaurants/${id}`)
            .then(() => {
                history.push('/restaurants'); 
            })
            .catch(error => console.error('Error deleting restaurant:', error));
    };

    if (!restaurant) return <div>Loading...</div>;

    return (
        <div className="card">
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default RestaurantDetails;
