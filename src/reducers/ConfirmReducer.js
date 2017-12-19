import * as ConfirmConstants from "../constants/ConfirmConstants";

const initialState = {
    showConfirm: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ConfirmConstants.OPEN_CONFIRM:
            return {
                ...state,
                showConfirm: true,
                title: action.title,
                message: action.message,
                onConfirm: action.onConfirm,
                onCancel: action.onCancel,
            };

        case ConfirmConstants.CLOSE_CONFIRM:
            return {
                ...state,
                showConfirm: false,
            };

        default:
            return state;
    }
}