import * as StepFormConstants from '../constants/StepFormConstants';

/**
 * Action to Open Add Modal
 *
 * @returns {function(*)}
 */
export const openModal = (type) => {
    return dispatch => {
        dispatch({
            type: StepFormConstants.OPEN_MODAL,
            stepType: type,
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