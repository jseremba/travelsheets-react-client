import * as UserConstants from '../constants/UserConstants';

const initialState = {
    isLoading: true,
    user: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UserConstants.CONFIRM_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case UserConstants.CONFIRM_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLoading: false,
            };
        case UserConstants.CONFIRM_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}