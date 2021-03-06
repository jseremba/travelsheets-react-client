import axios from '../helpers/axios';
import Notifications from "react-notification-system-redux";

import * as StepConstants from '../constants/StepConstants';

export const fetchSteps = (travel) => {
    return dispatch => {
        dispatch({
            type: StepConstants.LIST_REQUESTED
        });

        let url = `/travels/${travel}/steps`;

        return axios().get(url)
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

export const deleteStep = (stepId, travelId) => {
    return dispatch => {
        dispatch({
            type: StepConstants.DELETE_REQUESTED,
            stepId
        });

        let url = `/travels/${travelId}/steps/${stepId}`;

        return axios().delete(url)
            .then(response => {
                dispatch({
                    type: StepConstants.DELETE_SUCCESS,
                    stepId
                });

                dispatch(Notifications.success({
                    title: 'Yeah!',
                    message: 'L\'étape à bien été supprimée.',
                }));
            })
            .catch(error => {
                dispatch({
                    type: StepConstants.DELETE_FAILURE,
                    error: error
                });

                dispatch(Notifications.error({
                    title: 'Oh!',
                    message: 'Une erreur s\'est produite lors de la suppression de l\'étape.',
                    autoDismiss: 0,
                    action: {
                        label: 'Réessayer',
                        callback: () => {
                            deleteStep(stepId, travelId)(dispatch);
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

export const setActivePanel = (activePanel) => {
    return dispatch => {
        dispatch({
            type: StepConstants.SET_ACTIVE_PANEL,
            activePanel,
        });
    };
};