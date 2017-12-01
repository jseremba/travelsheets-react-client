import * as TravelConstant from '../constants/TravelConstants';

const initialState = {
    travel: null,
    isLoading: true
};

export default (state = initialState, action) => {
    switch(action.type) {
        case TravelConstant.GET_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case TravelConstant.GET_SUCCESS:
            return {
                ...state,
                travel: action.travel,
                isLoading: false
            };
        case TravelConstant.GET_FAILURE:
            return {
                ...state,
                travel: null,
                isLoading: false
            };

        case TravelConstant.SET:
            return {
                ...state,
                travel: action.travel,
                isLoading: false
            };

        default:
            return state;
    }
}