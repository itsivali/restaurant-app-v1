// Fetch all restaurants
export async function fetchRestaurants() {
    try {
        const response = await fetch("/restaurants");
        if (!response.ok) {
            throw new Error("Failed to fetch restaurants");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        throw error;
    }
}

// Fetch a specific restaurant by ID
export async function fetchRestaurantById(id) {
    try {
        const response = await fetch(`/restaurants/${id}`);
        if (!response.ok) {
            throw new Error("Restaurant not found");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        throw error;
    }
}

// Fetch all pizzas
export async function fetchPizzas() {
    try {
        const response = await fetch("/pizzas");
        if (!response.ok) {
            throw new Error("Failed to fetch pizzas");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching pizzas:", error);
        throw error;
    }
}

// Create a new RestaurantPizza
export async function createRestaurantPizza({ pizza_id, restaurant_id, price }) {
    try {
        const response = await fetch("/restaurant_pizzas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pizza_id, restaurant_id, price }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors.join(", "));
        }
        return response.json();
    } catch (error) {
        console.error("Error creating restaurant pizza:", error);
        throw error;
    }
}

// Delete a restaurant by ID
export async function deleteRestaurant(id) {
    try {
        const response = await fetch(`/restaurants/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete restaurant");
        }
        return response.json();
    } catch (error) {
        console.error("Error deleting restaurant:", error);
        throw error;
    }
}