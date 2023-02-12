import axios from 'axios';

const URL_FOR_SAVE = "http://upload-soft.photolab.me/upload.php";
const REST_URL = "http://localhost:8080/api/photos";

export default class PhotoAPI {

    static async getURL(formData) {
        const response = await axios.post(URL_FOR_SAVE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }

    static async create(photo, restaurantId) {
        const response = await axios.post(REST_URL + "/" + restaurantId, photo, {
            auth: {
                username: 'admin', password: 'admin'
            },
        });
        return response
    }

    static async delete(id) {
        const response = await axios.delete(REST_URL + "/" + id, {
            auth: {
                username: 'admin', password: 'admin'
            },
        });
        return response
    }
}