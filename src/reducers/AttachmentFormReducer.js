import * as AttachmentFormConstants from "../constants/AttachmentFormConstants";

const initialState = {
    showModal: false,
    isLoading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AttachmentFormConstants.OPEN_MODAL:
            return {
                ...state,
                showModal: true,
            };

        case AttachmentFormConstants.CLOSE_MODAL:
            return {
                ...state,
                showModal: false,
            };

        default:
            return state;
    }
}