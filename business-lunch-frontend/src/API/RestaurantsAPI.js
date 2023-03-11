import axios from 'axios';

const REST_URL = "http://localhost:8080/api/restaurants";
export default class RestaurantsAPI {

    static async getAll(limit, page, valueForSort, searchQuery, selectedCuisine) {
        const response = await axios.get(REST_URL,{
            params: {
                limit: limit,
                page: page,
                sort: valueForSort,
                searchQuery: searchQuery,
                cuisine: selectedCuisine
            }
        });
        return response
    }

    static async getById(id) {
        const response = await axios.get(REST_URL + '/' + id);
        return response
    }

    static async create(restaurant, username, password) {
        const response = await axios.post(REST_URL, restaurant, {
            auth: {
                username: username, password: password
            },
        });
        return response
    }

    static async update(restaurant, username, password) {
        const response = await axios.put(REST_URL, restaurant, {
            auth: {
                username: username, password: password
            },
        });
        return response
    }

    static async delete(restaurant, username, password) {
        const response = await axios.delete(REST_URL + "/" + restaurant.id, {
            auth: {
                username: username, password: password
            },
        });
        return response
    }
}