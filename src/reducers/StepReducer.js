import * as StepConstants from '../constants/StepConstants';

const initialState = {
    collection: [],
    item: null,
    isLoading: true
};

export default (state = initialState, action) => {
    switch(action.type) {
        // LIST
        case StepConstants.LIST_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case StepConstants.LIST_SUCCESS:
            return {
                ...state,
                collection: action.collection,
                isLoading: false
            };
        case StepConstants.LIST_FAILURE:
            return {
                ...state,
                collection: [],
                isLoading: false
            };

        default:
            return state;
    }
}