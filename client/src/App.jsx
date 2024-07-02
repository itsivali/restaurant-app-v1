import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Restaurants from './components/RestaurantsList';
import RestaurantDetails from './components/RestaurantDetails';
import Pizzas from './components/Pizzas';
import PizzaDetails from './components/PizzaDetails';
import RestaurantPizzas from './components/RestaurantPizzas';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/restaurants" exact component={Restaurants} />
          <Route path="/restaurants/:id" component={RestaurantDetails} />
          <Route path="/pizzas" exact component={Pizzas} />
          <Route path="/pizzas/:id" component={PizzaDetails} />
          <Route path="/restaurant-pizzas" component={RestaurantPizzas} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
