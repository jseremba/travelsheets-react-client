import * as TravelDeleteConstants from '../constants/TravelDeleteConstants';

const initialState = {
    showModal: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case TravelDeleteConstants.OPEN_MODAL:
            return {
                ...state,
                showModal: true
            };

        case TravelDeleteConstants.CLOSE_MODAL:
            return {
                ...state,
                showModal: false
            };

        case TravelDeleteConstants.DELETE_REQUESTED:
            return {
                ...state,
                isLoading: true
            };

        case TravelDeleteConstants.DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showModal: false,
            };

        case TravelDeleteConstants.DELETE_FAILURE:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}