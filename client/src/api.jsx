const API_URL = "http://localhost:3000";

// Fetch all restaurants
export async function fetchRestaurants() {
    try {
        const response = await fetch(`${API_URL}/restaurants`);
        if (!response.ok) throw new Error("Failed to fetch restaurants");
        return response.json();
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        throw error;
    }
}

// Fetch a specific restaurant by ID
export async function fetchRestaurantById(id) {
    try {
        const response = await fetch(`${API_URL}/restaurants/${id}`);
        if (!response.ok) throw new Error("Restaurant not found");
        return response.json();
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        throw error;
    }
}

// Create a new restaurant
export async function createRestaurant({ name, address }) {
    try {
        const response = await fetch(`${API_URL}/restaurants`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, address }),
        });
        if (!response.ok) throw new Error("Failed to create restaurant");
        return response.json();
    } catch (error) {
        console.error("Error creating restaurant:", error);
        throw error;
    }
}

// Update a restaurant
export async function updateRestaurant(id, { name, address }) {
    try {
        const response = await fetch(`${API_URL}/restaurants/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, address }),
        });
        if (!response.ok) throw new Error("Failed to update restaurant");
        return response.json();
    } catch (error) {
        console.error("Error updating restaurant:", error);
        throw error;
    }
}

// Delete a restaurant
export async function deleteRestaurant(id) {
    try {
        const response = await fetch(`${API_URL}/restaurants/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete restaurant");
        return response.ok;
    } catch (error) {
        console.error("Error deleting restaurant:", error);
        throw error;
    }
}

// Fetch all pizzas
export async function fetchPizzas() {
    try {
        const response = await fetch(`${API_URL}/pizzas`);
        if (!response.ok) throw new Error("Failed to fetch pizzas");
        return response.json();
    } catch (error) {
        console.error("Error fetching pizzas:", error);
        throw error;
    }
}

// Fetch a specific pizza by ID
export async function fetchPizzaById(id) {
    try {
        const response = await fetch(`${API_URL}/pizzas/${id}`);
        if (!response.ok) throw new Error("Pizza not found");
        return response.json();
    } catch (error) {
        console.error("Error fetching pizza:", error);
        throw error;
    }
}

// Create a new pizza
export async function createPizza({ name, ingredients }) {
    try {
        const response = await fetch(`${API_URL}/pizzas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, ingredients }),
        });
        if (!response.ok) throw new Error("Failed to create pizza");
        return response.json();
    } catch (error) {
        console.error("Error creating pizza:", error);
        throw error;
    }
}

// Update a pizza
export async function updatePizza(id, { name, ingredients }) {
    try {
        const response = await fetch(`${API_URL}/pizzas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, ingredients }),
        });
        if (!response.ok) throw new Error("Failed to update pizza");
        return response.json();
    } catch (error) {
        console.error("Error updating pizza:", error);
        throw error;
    }
}

// Delete a pizza
export async function deletePizza(id) {
    try {
        const response = await fetch(`${API_URL}/pizzas/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete pizza");
        return response.ok;
    } catch (error) {
        console.error("Error deleting pizza:", error);
        throw error;
    }
}

// Create a new RestaurantPizza
export async function createRestaurantPizza({ pizza_id, restaurant_id, price }) {
    try {
        const response = await fetch(`${API_URL}/restaurant_pizzas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pizza_id, restaurant_id, price }),
        });
        if (!response.ok) throw new Error("Failed to create restaurant pizza");
        return response.json();
    } catch (error) {
        console.error("Error creating restaurant pizza:", error);
        throw error;
    }
}
