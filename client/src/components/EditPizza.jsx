import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { fetchPizzaById, fetchRestaurants, updatePizza } from "../api";

function EditPizza() {
    const { id } = useParams();
    const [pizza, setPizza] = useState(null);
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [restaurantId, setRestaurantId] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function loadPizza() {
            try {
                const pizzaData = await fetchPizzaById(id);
                setPizza(pizzaData);
                setName(pizzaData.name);
                setIngredients(pizzaData.ingredients);
                setRestaurantId(pizzaData.restaurant_id);
            } catch (error) {
                console.error("Error fetching pizza:", error);
            }
        }
        async function loadRestaurants() {
            try {
                const data = await fetchRestaurants();
                setRestaurants(data);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        }
        loadPizza();
        loadRestaurants();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await updatePizza(id, { name, ingredients, restaurant_id: restaurantId });
            history.push(`/pizzas/${id}`);
        } catch (error) {
            console.error("Error updating pizza:", error);
        }
    }

    if (!pizza) return <p>Loading...</p>;

    return (
        <div className="card">
            <h1>Edit Pizza</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Ingredients:
                        <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Restaurant:
                        <select value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)} required>
                            <option value="">Select Restaurant</option>
                            {restaurants.map((restaurant) => (
                                <option key={restaurant.id} value={restaurant.id}>
                                    {restaurant.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type="submit">Update Pizza</button>
            </form>
        </div>
    );
}

export default EditPizza;
