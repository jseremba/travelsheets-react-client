import * as UserConstants from "../constants/UserConstants";

let user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    loggedIn: !!user,
    user: user,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UserConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
            };

        case UserConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };

        case UserConstants.LOGIN_FAILURE:
            return {};

        case UserConstants.LOGOUT:
            return {};

        default:
            return state
    }
}
