import axios from "axios";
import {API_URL} from "../settings/configuration";

export default function () {
    let headers = {};

    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        headers['Authorization'] = 'Bearer ' + user.token;
    }

    return axios.create({
        baseURL: API_URL,
        headers: headers,
        timeout: 5000,
    });
}