import React, { useEffect, useState } from "react";
import { fetchPizzas } from "../api";

function PizzaList() {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        async function loadPizzas() {
            try {
                const data = await fetchPizzas();
                setPizzas(data);
            } catch (error) {
                console.error("Error fetching pizzas:", error);
            }
        }

        loadPizzas();
    }, []);

    return (
        <div>
            <h1>Pizza List</h1>
            <ul>
                {pizzas.map((pizza) => (
                    <li key={pizza.id}>
                        <h2>{pizza.name}</h2>
                        <p>Ingredients: {pizza.ingredients}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PizzaList;
