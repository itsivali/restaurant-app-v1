import { useEffect, useState } from "react";

function PizzaForm({ restaurantId, onAddPizza }) {
  const [pizzas, setPizzas] = useState([]);
  const [pizzaId, setPizzaId] = useState("");
  const [price, setPrice] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    fetch("/pizzas")
      .then((r) => r.json())
      .then(setPizzas);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      pizza_id: pizzaId,
      restaurant_id: restaurantId,
      price,
    };
    fetch("/restaurant_pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          return r.json().then((err) => Promise.reject(err));
        }
      })
      .then((newPizzaRestaurant) => {
        onAddPizza(newPizzaRestaurant);
        setFormErrors([]);
      })
      .catch((err) => setFormErrors(err.errors || [err.error]));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="pizza_id">Pizza:</label>
      <select
        id="pizza_id"
        name="pizza_id"
        value={pizzaId}
        onChange={(e) => setPizzaId(e.target.value)}
      >
        <option value="">Select a pizza</option>
        {pizzas.map((pizza) => (
          <option key={pizza.id} value={pizza.id}>
            {pizza.name}
          </option>
        ))}
      </select>
      <label htmlFor="price">Price:</label>
      <input
        id="price"
        name="price"
        type="number"
        min="1"
        max="30"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {formErrors.length > 0 && (
        <div>
          {formErrors.map((err, index) => (
            <p key={index} style={{ color: "red" }}>
              {err}
            </p>
          ))}
        </div>
      )}
      <button type="submit">Add To Restaurant</button>
    </form>
  );
}

export default PizzaForm;