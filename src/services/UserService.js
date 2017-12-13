import axios from 'axios';
import {API_URL} from '../settings/configuration';

/**
 * Login with email and password
 *
 * @param email
 * @param password
 *
 * @returns {Promise.<*>}
 */
export const login = (email, password) => {
    let data =  {
        email: email,
        password: password,
    };

    return axios.post(API_URL + '/auth/login', data)
        .then(response => {
            let data = response.data;

            // login successful if there's a jwt token in the response
            if (data && data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(data));
            }
        })
        .catch(error => {
            return Promise.reject(error);
        })
    ;
};

/**
 * Logout
 */
export const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
};