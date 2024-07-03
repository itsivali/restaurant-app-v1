import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';

const PizzaForm = () => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchPizza = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/pizzas/${id}`);
                    const data = await response.json();
                    setName(data.name);
                    setIngredients(data.ingredients);
                    setIsEdit(true);
                } catch (error) {
                    console.error('Error fetching pizza:', error);
                }
            };

            fetchPizza();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = isEdit ? 'PUT' : 'POST';
        const url = isEdit ? `http://127.0.0.1:5000/pizzas/${id}` : 'http://127.0.0.1:5000/pizzas';

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, ingredients }),
            });

            toast.success(`Pizza ${isEdit ? 'updated' : 'added'} successfully!`);
            navigate('/pizzas');
        } catch (error) {
            console.error('Error saving pizza:', error);
            toast.error('Failed to save pizza.');
        }
    };

    return (
        <div className="form-container">
            <header>
                <nav>
                    <Link to="/pizzas">Back to List</Link>
                </nav>
            </header>
            <div className="card">
                <h1>{isEdit ? 'Edit Pizza' : 'Add Pizza'}</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
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
                    <button type="submit">{isEdit ? 'Update' : 'Add'} Pizza</button>
                </form>
            </div>
        </div>
    );
};

export default PizzaForm;
