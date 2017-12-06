/**
 * Action to Open Modal
 *
 * @returns {function(*)}
 */
import axios from 'axios';
import * as Notifications from "react-notification-system-redux";

import * as AttachmentFormConstants from '../constants/AttachmentFormConstants';

import {API_URL} from "../settings/configuration";
import {pushAttachment} from "./AttachmentsActions";

export const openModal = (step) => {
    return dispatch => {
        dispatch({
            type: AttachmentFormConstants.OPEN_MODAL,
            step
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
            type: AttachmentFormConstants.UPDATE_VALUE,
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
            type: AttachmentFormConstants.SET_ERROR,
            name,
            error,
            validation
        });
    }
};

export const addAttachment = (travelId, stepId, data) => {
    return dispatch => {
        dispatch({
            type: AttachmentFormConstants.ADD_REQUESTED,
        });

        let url = API_URL + '/travels/' + travelId + '/steps/' + stepId + '/attachments';

        axios.post(url, data)
            .then(response => {
                dispatch({
                    type: AttachmentFormConstants.ADD_SUCCESS,
                    attachment: response.data,
                });

                dispatch(Notifications.success({
                    title: 'Yeah!',
                    message: 'Le fichier a bien été enregistré.',
                    action: {
                        label: 'Voir le fichier',
                        callback: () => {
                            console.log('go to step');
                        }
                    }
                }));

                pushAttachment(response.data)(dispatch);
            })
            .catch(error => {
                dispatch({
                    type: AttachmentFormConstants.ADD_FAILURE,
                });
            });
    };
};