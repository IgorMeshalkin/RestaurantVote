import axios from 'axios';

const REST_URL = "http://localhost:8080/api/restaurants";
export default class RestaurantsAPI {

    static async getAll(limit, page, valueForSort, searchQuery, selectedCuisine) {
        const response = await axios.get(REST_URL,{
            auth: {
                username: 'admin', password: 'admin'
            },
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
}