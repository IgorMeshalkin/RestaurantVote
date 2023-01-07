import axios from 'axios';

// const REST_URL = "http://picabox.ru/image/upload";
const REST_URL = "http://upload-soft.photolab.me/upload.php";

export default class PhotoAPI {

    static async savePhoto(formData) {
        const response = await axios.post(REST_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }
}