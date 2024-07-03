// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import PizzaList from './components/PizzaList';
import RestaurantForm from './components/RestaurantForm';
import PizzaForm from './components/PizzaForm';
import RestaurantPizzaList from './components/RestaurantPizzaList';
import Navbar from './components/Navbar';
import './index.css'; 

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<h1>Welcome to The Pizza Society</h1>} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurants/new" element={<RestaurantForm />} />
          <Route path="/restaurants/:id" element={<RestaurantForm />} />
          <Route path="/pizzas" element={<PizzaList />} />
          <Route path="/pizzas/new" element={<PizzaForm />} />
          <Route path="/pizzas/:id" element={<PizzaForm />} />
          <Route path="/restaurant-pizzas" element={<RestaurantPizzaList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
