import * as StepFormConstants from '../constants/StepFormConstants';

/**
 * Action to Open Add Modal
 *
 * @returns {function(*)}
 */
export const openModal = () => {
    return dispatch => {
        dispatch({
            type: StepFormConstants.OPEN_MODAL
        });
    };
};

/**
 * Action to Close Add Modal
 *
 * @returns {function(*)}
 */
export const closeModal = () => {
    return dispatch => {
        dispatch({
            type: StepFormConstants.CLOSE_MODAL
        });
    };
};