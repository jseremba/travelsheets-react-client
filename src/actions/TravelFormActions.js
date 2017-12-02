/**
 * Action to add a Travel
 *
 * @param data
 *
 * @returns {function(*)}
 */
import axios from 'axios';

import * as TravelFormConstants from '../constants/TravelFormConstants';
import * as TravelConstants from '../constants/TravelConstants';

import * as NotificationsActions from 'react-notification-system-redux';

import {API_URL} from "../settings/configuration";

export const add = (data) => {
    return dispatch => {
        dispatch({
            type: TravelFormConstants.SAVE_REQUESTED
        });

        let url = `${API_URL}/travels`;

        return axios.post(url, data)
            .then(response => {
                dispatch({
                    type: TravelFormConstants.SAVE_SUCCESS,
                    travel: response.data
                });

                dispatch(NotificationsActions.success({
                    title: 'Yeah!',
                    message: 'Le voyage à bien été enregistré.',
                    action: {
                        label: 'Voir le voyage',
                        callback: () => alert('clicked!')
                    }
                }));
            })
            .catch(error => {
                dispatch({
                    type: TravelFormConstants.SAVE_FAILURE,
                    error: error
                });

                // dispatch({
                //     type: NotificationsConstants.ADD_NOTIFICATION,
                //     message: (
                //         <p>Une erreur s'est produite lors de l'enregistrement du voyage</p>
                //     ),
                //     level: 'warning'
                // });
            })
            ;
    };
};

/**
 * Action to edit a Travel
 *
 * @param id
 * @param data
 *
 * @returns {function(*)}
 */
export const edit = (id, data) => {
    return dispatch => {
        dispatch({
            type: TravelFormConstants.SAVE_REQUESTED
        });

        let url = `${API_URL}/travels/${id}`;

        return axios.patch(url, data)
            .then(response => {
                dispatch({
                    type: TravelFormConstants.SAVE_SUCCESS,
                    travel: response.data
                });

                dispatch({
                    type: TravelFormConstants.SET_TRAVEL,
                    travel: response.data
                });

                dispatch({
                    type: TravelConstants.SET_TRAVEL,
                    travel: response.data
                });

                // dispatch({
                //     type: NotificationsConstants.ADD_NOTIFICATION,
                //     message: (
                //         <p>Le voyage à bien été sauvegardé.</p>
                //     ),
                //     level: 'success'
                // });
            })
            .catch(error => {
                dispatch({
                    type: TravelFormConstants.SAVE_FAILURE,
                    error: error
                });

                // dispatch({
                //     type: NotificationsConstants.ADD_NOTIFICATION,
                //     message: (
                //         <p>Une erreur s'est produite lors de l'enregistrement du voyage</p>
                //     ),
                //     level: 'warning'
                // });
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
            type: TravelFormConstants.OPEN_MODAL
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
            type: TravelFormConstants.CLOSE_MODAL
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
            type: TravelFormConstants.UPDATE_VALUE,
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
            type: TravelFormConstants.SET_ERROR,
            name,
            error,
            validation
        });
    }
};

/**
 * Action to set travel
 *
 * @param travel
 *
 * @returns {function(*)}
 */
export const setTravel = (travel) => {
    return dispatch => {
        dispatch({
            type: TravelFormConstants.SET_TRAVEL,
            travel,
        });
    }
};