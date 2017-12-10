import * as TravelConstant from '../constants/TravelsConstants';

const initialState = {
    travels: {
        items: [],
        pagination: null,
    },
    isLoading: true,
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
                travels: initialState.travels,
                isLoading: false
            };

        default:
            return state;
    }
}