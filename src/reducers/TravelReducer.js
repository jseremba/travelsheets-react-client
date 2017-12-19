import * as TravelConstants from '../constants/TravelConstants';

const initialState = {
    travel: null,
    isLoading: true
};

export default (state = initialState, action) => {
    switch(action.type) {
        case TravelConstants.GET_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case TravelConstants.GET_SUCCESS:
            return {
                ...state,
                travel: action.travel,
                isLoading: false
            };
        case TravelConstants.GET_FAILURE:
            return {
                ...state,
                travel: null,
                isLoading: false
            };

        case TravelConstants.SET_TRAVEL:
            return {
                ...state,
                travel: action.travel,
                isLoading: false
            };

        default:
            return state;
    }
}