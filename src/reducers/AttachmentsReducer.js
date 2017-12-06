import * as AttachmentsConstants from "../constants/AttachmentsConstants";

const initialState = {
    collection: {
        items: [],
        pagination: null,
    },
    isLoading: true,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case AttachmentsConstants.LIST_REQUESTED:
            return {
                ...state,
                isLoading: true,
            };

        case AttachmentsConstants.LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                collection: action.collection,
            };

        case AttachmentsConstants.LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                collection: initialState.collection
            };

        case AttachmentsConstants.RESET_ATTACHMENTS:
            return {
                ...state,
                isLoading: true,
                collection: initialState.collection,
            };

        default:
            return state;
    }
}