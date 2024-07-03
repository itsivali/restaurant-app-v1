import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './PizzaList.css'; 

const PizzaList = () => {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/pizzas');
                const data = await response.json();
                setPizzas(data);
            } catch (error) {
                console.error('Error fetching pizzas:', error);
            }
        };

        fetchPizzas();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this pizza?')) {
            try {
                await fetch(`http://127.0.0.1:5000/pizzas/${id}`, {
                    method: 'DELETE',
                });
                setPizzas(pizzas.filter(pizza => pizza.id !== id));
                toast.success('Pizza deleted successfully!');
            } catch (error) {
                console.error('Error deleting pizza:', error);
                toast.error('Failed to delete pizza.');
            }
        }
    };

    return (
        <div className="container">
            <h1>Pizzas</h1>
            <Link to="/pizzas/new">Add New Pizza</Link>
            <ul>
                {pizzas.map(pizza => (
                    <li key={pizza.id} className="list-item">
                        <Link to={`/pizzas/${pizza.id}`}>{pizza.name}</Link>
                        <div className="list-item-actions">
                            <button onClick={() => handleDelete(pizza.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PizzaList;
