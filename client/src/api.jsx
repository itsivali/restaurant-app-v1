import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

export const getRestaurants = () => axios.get(`${API_BASE_URL}/restaurants`);
export const getPizzas = () => axios.get(`${API_BASE_URL}/pizzas`);
export const createRestaurant = (data) => axios.post(`${API_BASE_URL}/restaurants`, data);
export const updateRestaurant = (id, data) => axios.put(`${API_BASE_URL}/restaurants/${id}`, data);
export const deleteRestaurant = (id) => axios.delete(`${API_BASE_URL}/restaurants/${id}`);
export const getRestaurant = (id) => axios.get(`${API_BASE_URL}/restaurants/${id}`);

export const createPizza = (data) => axios.post(`${API_BASE_URL}/pizzas`, data);
export const updatePizza = (id, data) => axios.put(`${API_BASE_URL}/pizzas/${id}`, data);
export const deletePizza = (id) => axios.delete(`${API_BASE_URL}/pizzas/${id}`);
export const getPizza = (id) => axios.get(`${API_BASE_URL}/pizzas/${id}`);
export const getRestaurantPizzas = (id) => axios.get(`${API_BASE_URL}/restaurants/${id}/pizzas`);
export const getPizzaRestaurants = (id) => axios.get(`${API_BASE_URL}/pizzas/${id}/restaurants`);
