import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPizzas, createPizza } from '../api';

function Pizzas() {
    const [pizzas, setPizzas] = useState([]);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');

    useEffect(() => {
        fetchPizzas();
    }, []);

    const fetchPizzas = async () => {
        try {
            const response = await getPizzas();
            setPizzas(response.data);
        } catch (error) {
            console.error('Error fetching pizzas:', error);
        }
    };

    const handleCreatePizza = async () => {
        try {
            const newPizza = { name, ingredients };
            await createPizza(newPizza);
            fetchPizzas();
        } catch (error) {
            console.error('Error creating pizza:', error);
        }
    };

    return (
        <div>
            <h2>Pizzas</h2>
            <ul>
                {pizzas.map(pizza => (
                    <li key={pizza.id}>
                        <Link to={`/pizzas/${pizza.id}`}>{pizza.name}</Link>
                    </li>
                ))}
            </ul>
            <h2>Create Pizza</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Ingredients"
                value={ingredients}
                onChange={e => setIngredients(e.target.value)}
            />
            <button onClick={handleCreatePizza}>Create</button>
        </div>
    );
}

export default Pizzas;
