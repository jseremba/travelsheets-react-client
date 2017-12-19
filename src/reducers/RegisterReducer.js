import * as UserConstants from '../constants/UserConstants';

const initialState = {
    isLoading: false,
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UserConstants.REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case UserConstants.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user,
            };
        case UserConstants.REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}