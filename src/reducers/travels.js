import * as TravelConstant from '../constants/travels';

const initialState = {
    travels: [],
    isLoading: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case TravelConstant.LIST_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case TravelConstant.LIST_SUCCESS:
            return {
                ...state,
                travels: action.travels,
                isLoading: false
            };
        case TravelConstant.LIST_FAILURE:
            return {
                ...state,
                travels: [],
                isLoading: false
            };
        default:
            return state;
    }
}