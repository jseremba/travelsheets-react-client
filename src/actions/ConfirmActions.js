import * as ConfirmConstants from "../constants/ConfirmConstants";

export const openConfirm = (message, title, onConfirm, onCancel) => {
    return dispatch => {
        dispatch({
            type: ConfirmConstants.OPEN_CONFIRM,
            message, title, onConfirm, onCancel
        });
    }
};

export const closeConfirm = () => {
    return dispatch => {
        dispatch({
            type: ConfirmConstants.CLOSE_CONFIRM,
        });
    }
};