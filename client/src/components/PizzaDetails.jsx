import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getPizza, updatePizza, deletePizza } from '../api';

function PizzaDetails() {
    const { id } = useParams();
    const [pizza, setPizza] = useState(null);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const response = await getPizza(id);
                setPizza(response.data);
                setName(response.data.name);
                setIngredients(response.data.ingredients);
            } catch (error) {
                console.error('Error fetching pizza:', error);
            }
        };

        fetchPizza();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updatePizza(id, { name, ingredients });
            history.push('/pizzas');
        } catch (error) {
            console.error('Error updating pizza:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePizza(id);
            history.push('/pizzas');
        } catch (error) {
            console.error('Error deleting pizza:', error);
        }
    };

    return (
        <div className="container">
            {pizza && (
                <div className="card">
                    <h2>Pizza: {pizza.name}</h2>
                    <p>Ingredients: {pizza.ingredients}</p>

                    <form onSubmit={handleUpdate}>
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
                        <button type="submit">Update Pizza</button>
                    </form>

                    <div className="button-container">
                        <button onClick={handleDelete}>Delete Pizza</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PizzaDetails;
