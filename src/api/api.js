import axios from "axios";

const requireServices = require.context('./services', true, /.service.js$/);
class API {
    request = axios.create({
        baseUrl: "http://localhost:3001/"
    });

    constructor() {
        requireServices.keys().forEach(filename => {
            requireServices(filename).default(this);
        });

        this.request.interceptors.response.use(
            function (response) {
                return response.data;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
    }
}

const api = new API();
export default api;
