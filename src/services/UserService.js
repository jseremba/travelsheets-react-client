import axios from '../helpers/axios';
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

    return axios().post('/auth/login', data)
        .then(response => {
            let data = response.data;

            // login successful if there's a jwt token in the response
            if (data && data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(data));
            }

            return Promise.resolve(data);
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

/**
 * Register
 *
 * @param data
 *
 * @returns {Promise.<*>}
 */
export const register = (data) => {
    return axios().post('auth/register', data)
        .then(response => {
            return Promise.resolve(response.data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

/**
 * Register Confirm
 *
 * @param email
 * @param token
 * @returns {Promise.<*>}
 */
export const registerConfirm = (email, token) => {
    if(email && token) {
        let data = {
            email: email,
            token: token
        };

        return axios().post('auth/register/confirm', data)
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    } else {
        return Promise.reject({
            'message': 'Il doit y avoir un email et un token',
        });
    }

};