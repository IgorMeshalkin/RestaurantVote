import axios from 'axios';

const REST_URL = "http://localhost:8080/api/comments/";
export default class CommentAPI {

    static async getAll(restaurantId, limit, page) {
        const response = await axios.get(REST_URL + restaurantId, {
            auth: {
                username: 'admin', password: 'admin'
            },
            params: {
                limit: limit,
                page: page
            }
        });
        return response
    }
}