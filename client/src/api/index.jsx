import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000', 
});

export const getRestaurants = () => api.get('/restaurants');
export const getRestaurant = (id) => api.get(`/restaurants/${id}`);
export const createRestaurant = (data) => api.post('/restaurants', data);
export const updateRestaurant = (id, data) => api.put(`/restaurants/${id}`, data);
export const deleteRestaurant = (id) => api.delete(`/restaurants/${id}`);

export const getPizzas = () => api.get('/pizzas');
export const getPizza = (id) => api.get(`/pizzas/${id}`);
export const createPizza = (data) => api.post('/pizzas', data);
export const updatePizza = (id, data) => api.put(`/pizzas/${id}`, data);
export const deletePizza = (id) => api.delete(`/pizzas/${id}`);

export const createRestaurantPizza = (data) => api.post('/restaurant_pizzas', data);
export const getRestaurantPizzas = (restaurantId) => api.get(`/restaurants/${restaurantId}/pizzas`);
