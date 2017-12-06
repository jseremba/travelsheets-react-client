import * as AttachmentFormConstants from '../constants/AttachmentFormConstants';

/**
 * Action to Open Modal
 *
 * @returns {function(*)}
 */
export const openModal = () => {
    return dispatch => {
        dispatch({
            type: AttachmentFormConstants.OPEN_MODAL
        });
    };
};


/**
 * Action to Close Modal
 *
 * @returns {function(*)}
 */
export const closeModal = () => {
    return dispatch => {
        dispatch({
            type: AttachmentFormConstants.CLOSE_MODAL
        });
    };
};