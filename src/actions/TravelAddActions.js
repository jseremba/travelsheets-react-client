import * as TravelAddConstants from '../constants/TravelAddConstants';

export const save = () => {
    return dispatch => {
        dispatch({
            type: TravelAddConstants.SAVE_REQUESTED
        })
    }
};

/**
 * Action to Open Add Modal
 *
 * @returns {function(*)}
 */
export const openModal = () => {
    return dispatch => {
        dispatch({
            type: TravelAddConstants.OPEN_MODAL
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
            type: TravelAddConstants.CLOSE_MODAL
        });
    };
};