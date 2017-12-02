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

/**
 * Action to update value of form item
 *
 * @param name
 * @param value
 *
 * @returns {function(*)}
 */
export const updateValue = (name, value) => {
    return dispatch => {
        dispatch({
            type: StepFormConstants.UPDATE_VALUE,
            name,
            value
        });
    }
};