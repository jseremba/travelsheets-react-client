import * as TravelConstant from '../constants/TravelsConstants';

const initialState = {
    travels: [],
    isLoading: false,
    searchBar: '',
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
        case TravelConstant.SET_SEARCH_BAR:
            return {
                ...state,
                searchBar: action.keyword,
                isLoading: true
            };

        default:
            return state;
    }
}