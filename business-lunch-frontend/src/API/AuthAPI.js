import axios from 'axios';

const REST_URL = "http://localhost:8080/api/users";
export default class AuthAPI {

    static async login(username, password) {
        const response = await axios.get(REST_URL, {
            auth: {
                username: username, password: password
            }
        });
        return response
    }

    static async registration(firstName, lastName, login, password) {
        const response = await axios.post(REST_URL, {
            firstName: firstName,
            lastName: lastName,
            username: login,
            password: password
        });
        return response
    }
}