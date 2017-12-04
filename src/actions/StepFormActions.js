import axios from 'axios';

import Notifications from "react-notification-system-redux";

import * as StepFormConstants from '../constants/StepFormConstants';
import {API_URL} from "../settings/configuration";

import {fetchSteps} from "./StepActions";

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

/**
 * Action to set error to a field
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
            type: StepFormConstants.SET_ERROR,
            name,
            error,
            validation,
        })
    }
};

/**
 * Action to add a Step to Travel
 *
 * @param travel
 * @param type
 * @param data
 *
 * @returns {function(*=)}
 */
export const add = (travel, type, data) => {
    return dispatch => {
        dispatch({
            type: StepFormConstants.SAVE_REQUESTED,
        });

        let url = `${API_URL}/travels/${travel}/steps?type=${type}`;

        return axios.post(url, data)
            .then(response => {
                dispatch({
                    type: StepFormConstants.SAVE_SUCCESS,
                    travel: response.data
                });

                dispatch(Notifications.success({
                    title: 'Yeah!',
                    message: 'L\'étape à bien été enregistrée.',
                    action: {
                        label: 'Voir l\'étape',
                        callback: () => {
                            console.log('go to step');
                        }
                    }
                }));

                fetchSteps(travel)(dispatch);
            })
            .catch(error => {
                dispatch({
                    type: StepFormConstants.SAVE_FAILURE,
                    error: error
                });

                dispatch(Notifications.error({
                    title: 'Oh!',
                    message: 'Une erreur s\'est produite lors de l\'enregistement.',
                    autoDismiss: 0,
                    action: {
                        label: 'Réessayer',
                        callback: () => {
                            add(travel, type, data)(dispatch);
                        }
                    }
                }));
            });
    };
};