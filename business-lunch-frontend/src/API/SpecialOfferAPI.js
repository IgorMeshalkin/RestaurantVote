import axios from 'axios';

const REST_URL = "http://localhost:8080/api/special_offers";
export default class SpecialOfferAPI {

    static async getAll() {
        const response = await axios.get(REST_URL,{
            auth: {
                username: 'admin', password: 'admin'
            }
        });
        return response
    }
}