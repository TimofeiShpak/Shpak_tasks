import axios from "axios";

const PATH = "http://localhost:3001";

const requireServices = require.context('./services', true, /.service.js$/);

axios.defaults.baseURL = PATH;

class API {
    request = axios.create();

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
