import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8086/backend/api/'
});
export default instance;