import * as UserConstants from '../constants/UserConstants';
import * as UserService from "../services/UserService";
import * as Notifications from "react-notification-system-redux";
import {push} from "react-router-redux";

export const login = (email, password) => {
    return dispatch => {
        dispatch(request({ email }));

        UserService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(push('/'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(Notifications.error(error));
                }
            );

        function request(user) {
            return { type: UserConstants.LOGIN_REQUEST, user }
        }

        function success(user) {
            return { type: UserConstants.LOGIN_SUCCESS, user }
        }

        function failure(error) {
            return { type: UserConstants.LOGIN_FAILURE, error }
        }
    };
};

export const logout = () => {
    UserService.logout();
    return { type: UserConstants.LOGOUT };
};

export const register = (data) => {
    return dispatch => {
        dispatch(request(data));

        UserService.register(data)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(Notifications.error(error));
                }
            );

        function request(user) {
            return { type: UserConstants.REGISTER_REQUEST, user }
        }

        function success(user) {
            return { type: UserConstants.REGISTER_SUCCESS, user }
        }

        function failure(error) {
            return { type: UserConstants.REGISTER_FAILURE, error }
        }
    }
};

export const registerConfirm = (email, token) => {
    return dispatch => {
        dispatch(request());

        UserService.registerConfirm(email, token)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    let message = '';

                    if(error.response) {
                        switch(error.response.status) {
                            case 404:
                                message = 'Cette adresse email est inconnue ou a déjà été validée.';
                                break;
                            default:
                                message = 'Une erreur s\'est produite lors de l\'accès au serveur';
                                break;
                        }
                    }

                    dispatch(failure(error));

                    dispatch(Notifications.error({
                        'title': 'D\'oh!',
                        'message': message,
                    }));

                    dispatch(push('/login'));
                }
            );

        function request() {
            return { type: UserConstants.CONFIRM_REQUEST }
        }

        function success(user) {
            return { type: UserConstants.CONFIRM_SUCCESS, user }
        }

        function failure(error) {
            return { type: UserConstants.CONFIRM_FAILURE, error }
        }
    };
};