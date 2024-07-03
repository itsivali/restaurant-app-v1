import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './RestaurantForm.css'; 

const RestaurantForm = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchRestaurant = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/restaurants/${id}`);
                    const data = await response.json();
                    setName(data.name);
                    setAddress(data.address);
                    setIsEdit(true);
                } catch (error) {
                    console.error('Error fetching restaurant:', error);
                }
            };

            fetchRestaurant();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = isEdit ? 'PUT' : 'POST';
        const url = isEdit ? `http://127.0.0.1:5000/restaurants/${id}` : 'http://127.0.0.1:5000/restaurants';

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, address }),
            });

            toast.success(`Restaurant ${isEdit ? 'updated' : 'added'} successfully!`);
            navigate('/restaurants');
        } catch (error) {
            console.error('Error saving restaurant:', error);
            toast.error('Failed to save restaurant.');
        }
    };

    return (
        <div className="form-container">
            <h1>{isEdit ? 'Edit Restaurant' : 'Add Restaurant'}</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-label">
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label className="form-label">
                    Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <div className="form-buttons">
                    <button type="submit" className="small-button">{isEdit ? 'Update' : 'Add'} Restaurant</button>
                    <Link to="/restaurants">
                        <button type="button" className="small-button">Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RestaurantForm;
