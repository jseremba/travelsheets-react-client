import * as StepConstants from '../constants/StepConstants';

const initialState = {
    collection: [],
    item: null,
    isLoading: true,
    activePanel: null,
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
        case StepConstants.DELETE_REQUESTED:
            let index = -1;

            for(let i=0; i<state.collection.items.length; i++) {
                let item = state.collection.items[i];

                if(item['@id'] === action.stepId) {
                    index = i;
                    break;
                }
            }

            return {
                ...state,
                collection: {
                    ...state.collection,
                    items: [
                        ...state.collection.items.slice(0, index),
                        ...state.collection.items.slice(index + 1)
                    ]
                }
            };

        case StepConstants.DELETE_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        case StepConstants.SET_STEPS:
            return {
                ...state,
                collection: action.steps,
            };

        case StepConstants.SET_ACTIVE_PANEL:
            return {
                ...state,
                activePanel: action.activePanel,
            };

        default:
            return state;
    }
}