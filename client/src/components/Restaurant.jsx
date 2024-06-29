// src/components/Restaurant.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PizzaForm from "./PizzaForm";
import { fetchRestaurantById, createRestaurantPizza } from "../api";

function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({
    data: null,
    error: null,
    status: "pending",
  });

  useEffect(() => {
    fetchRestaurantById(id)
      .then((data) => setRestaurant({ data, error: null, status: "resolved" }))
      .catch((err) => setRestaurant({ data: null, error: err.message, status: "rejected" }));
  }, [id]);

  function handleAddPizza(newRestaurantPizza) {
    setRestaurant((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        restaurant_pizzas: [...prevState.data.restaurant_pizzas, newRestaurantPizza],
      },
    }));
  }

  if (restaurant.status === "pending") return <h1>Loading...</h1>;
  if (restaurant.status === "rejected") return <h1>Error: {restaurant.error}</h1>;

  const { data: restaurantData } = restaurant;

  return (
    <section className="container">
      <div className="card">
        <h1>{restaurantData.name}</h1>
        <p>{restaurantData.address}</p>
      </div>
      <div className="card">
        <h2>Pizza Menu</h2>
        {restaurantData.restaurant_pizzas.map((restaurantPizza) => (
          <div key={restaurantPizza.id}>
            <h3>{restaurantPizza.pizza.name}</h3>
            <p><em>{restaurantPizza.pizza.ingredients}</em></p>
            <p><em>Price ${restaurantPizza.price}</em></p>
          </div>
        ))}
      </div>
      <div className="card">
        <h3>Add New Pizza</h3>
        <PizzaForm restaurantId={restaurantData.id} onAddPizza={handleAddPizza} />
      </div>
    </section>
  );
}

export default Restaurant;
