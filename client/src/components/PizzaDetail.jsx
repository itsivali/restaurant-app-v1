import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchPizzaById } from "../api";

function PizzaDetail() {
    const { id } = useParams();
    const [pizza, setPizza] = useState(null);

    useEffect(() => {
        async function loadPizza() {
            try {
                const data = await fetchPizzaById(id);
                setPizza(data);
            } catch (error) {
                console.error("Error fetching pizza:", error);
            }
        }

        loadPizza();
    }, [id]);

    if (!pizza) return <p>Loading...</p>;

    return (
        <div>
            <h1>{pizza.name}</h1>
            <p>Ingredients: {pizza.ingredients}</p>
        </div>
    );
}

export default PizzaDetail;
