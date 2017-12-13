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