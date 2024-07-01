import { useState } from "react";
import { createRestaurantPizza } from "../api";

function RestaurantPizzaForm({ restaurantId, onAddPizza }) {
    const [pizzaId, setPizzaId] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const newRestaurantPizza = await createRestaurantPizza({
                pizza_id: pizzaId,
                restaurant_id: restaurantId,
                price: parseFloat(price),
            });
            onAddPizza(newRestaurantPizza);
            setPizzaId("");
            setPrice("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add New Pizza</h3>
            <div>
                <label htmlFor="pizzaId">Pizza ID:</label>
                <input
                    type="text"
                    id="pizzaId"
                    value={pizzaId}
                    onChange={(e) => setPizzaId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Pizza"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}

export default RestaurantPizzaForm;
