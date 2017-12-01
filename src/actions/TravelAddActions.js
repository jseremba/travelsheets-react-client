import axios from 'axios';
import * as TravelAddConstants from '../constants/TravelAddConstants';
import {API_URL} from "../settings/configuration";

/**
 * Action to Save
 *
 * @returns {function(*)}
 */
export const save = (values) => {
    return dispatch => {
        dispatch({
            type: TravelAddConstants.SAVE_REQUESTED
        });

        let url = `${API_URL}/travels`;

        return axios.post(url, values)
            .then(response => {
                dispatch({
                    type: TravelAddConstants.SAVE_SUCCESS,
                    travel: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: TravelAddConstants.SAVE_FAILURE,
                    error: error
                });
            })
        ;
    };
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
            type: TravelAddConstants.UPDATE_VALUE,
            name,
            value
        });
    }
};

/**
 * Action to set error of form item
 *
 * @param name
 * @param error
 * @param validation
 *
 * @returns {function(*)}
 */
export const setError = (name, error, validation = 'error') => {
    return dispatch => {
        dispatch({
            type: TravelAddConstants.SET_ERROR,
            name,
            error,
            validation
        });
    }
};