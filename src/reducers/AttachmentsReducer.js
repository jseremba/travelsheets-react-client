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

        case AttachmentsConstants.DELETE_REQUESTED:
            let index = -1;

            for(let i=0; i<state.collection.items.length; i++) {
                let item = state.collection.items[i];

                if(item['@id'] === action.attachmentId) {
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

        case AttachmentsConstants.RESET_ATTACHMENTS:
            return {
                ...state,
                isLoading: true,
                collection: initialState.collection,
            };

        case AttachmentsConstants.PUSH_ATTACHMENT:
            return {
                ...state,
                collection: {
                    ...state.collection,
                    items: [
                        ...state.collection.items,
                        action.attachment,
                    ]
                }
            };


        default:
            return state;
    }
}