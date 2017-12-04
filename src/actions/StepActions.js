import axios from 'axios';
import Notifications from "react-notification-system-redux";

import * as StepConstants from '../constants/StepConstants';

import {API_URL} from "../settings/configuration";


export const fetchSteps = (travel) => {
    return dispatch => {
        dispatch({
            type: StepConstants.LIST_REQUESTED
        });

        let url = `${API_URL}/travels/${travel}/steps`;

        return axios.get(url)
            .then(response => {
                dispatch({
                    type: StepConstants.LIST_SUCCESS,
                    collection: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: StepConstants.LIST_FAILURE,
                    error: error
                });

                dispatch(Notifications.error({
                    title: 'Oh!',
                    message: 'Une erreur s\'est produite lors de l\'accès au serveur.',
                    autoDismiss: 0,
                    action: {
                        label: 'Réessayer',
                        callback: () => {
                            fetchSteps(travel)(dispatch);
                        }
                    }
                }));
            })
            ;
    }
};

export const setSteps = (steps = []) => {
    return dispatch => {
        dispatch({
            type: StepConstants.SET_STEPS,
            steps
        });
    }
};