// src/components/Home.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PizzaForm from "./PizzaForm";
import { fetchRestaurants, fetchRestaurantById, createRestaurantPizza, deleteRestaurant } from "../api";

function Home() {
  const { id } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState({
    data: null,
    error: null,
    status: "pending",
  });

  useEffect(() => {
    if (id) {
      fetchRestaurantById(id)
        .then((data) => setRestaurant({ data, error: null, status: "resolved" }))
        .catch((err) => setRestaurant({ data: null, error: err.message, status: "rejected" }));
    } else {
      fetchRestaurants()
        .then(setRestaurants)
        .catch((err) => console.error(err));
    }
  }, [id]);

  function handleAddPizza(newRestaurantPizza) {
    createRestaurantPizza(newRestaurantPizza)
      .then((data) => {
        setRestaurant((prevState) => ({
          ...prevState,
          data: {
            ...prevState.data,
            restaurant_pizzas: [...prevState.data.restaurant_pizzas, data],
          },
        }));
      })
      .catch((err) => console.error(err));
  }

  function handleDelete(id) {
    deleteRestaurant(id).then(() => {
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant.id !== id)
      );
    });
  }

  if (id) {
    const { data: restaurantData, error, status } = restaurant;

    if (status === "pending") return <h1>Loading...</h1>;
    if (status === "rejected") return <h1>Error: {error}</h1>;

    return (
      <section className="container">
        <div className="card">
          <h1>{restaurantData.name}</h1>
          <p>{restaurantData.address}</p>
        </div>
        <div className="card">
          <h2>Pizza Menu</h2>
          {restaurantData.restaurant_pizzas.map((restaurant_pizza) => (
            <div key={restaurant_pizza.id}>
              <h3>{restaurant_pizza.pizza.name}</h3>
              <p><em>{restaurant_pizza.pizza.ingredients}</em></p>
              <p><em>Price ${restaurant_pizza.price}</em></p>
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

  return (
    <section className="container">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="card">
          <h2>
            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
          </h2>
          <p>Address: {restaurant.address}</p>
          <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
        </div>
      ))}
    </section>
  );
}

export default Home;
