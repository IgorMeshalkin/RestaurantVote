import axios from "axios";
const REST_URL = "http://localhost:8080/api/meals";

export default class MealAPI {

    static async create(meal, restaurantId, username, password) {
        const response = await axios.post(REST_URL + "/" + restaurantId, meal, {
            auth: {
                username: username, password: password
            },
        });
        return response
    }

    static async update(meal, username, password) {
        const response = await axios.put(REST_URL, meal, {
            auth: {
                username: username, password: password
            },
        });
        return response
    }

    static async delete(id, username, password) {
        const response = await axios.delete(REST_URL + "/" + id, {
            auth: {
                username: username, password: password
            },
        });
        return response
    }
}