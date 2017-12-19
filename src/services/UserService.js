import axios from '../helpers/axios';

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
                let formattedError = {
                    status: 500,
                    message: '',
                };

                if(error.response) {
                    formattedError.status = error.response.status;

                    switch(error.response.status) {
                        case 404:
                            formattedError.message = 'Cette adresse email est inconnue ou a déjà été validée.';
                            break;
                        default:
                            formattedError.message = 'Une erreur s\'est produite lors de l\'accès au serveur';
                            break;
                    }
                }

                return Promise.reject(formattedError);
            });
    } else {
        return Promise.reject({
            'message': 'Il doit y avoir un email et un token',
        });
    }
};