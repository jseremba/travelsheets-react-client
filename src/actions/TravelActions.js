import axios from '../helpers/axios';
import Notifications from "react-notification-system-redux";

import * as TravelConstants from '../constants/TravelConstants';

import {push} from "react-router-redux";

export const fetchTravel = (id) => {
    return dispatch => {
        dispatch({
            type: TravelConstants.GET_REQUESTED
        });

        let url = `/travels/${id}`;

        return axios().get(url)
            .then(response => {
                dispatch({
                    type: TravelConstants.GET_SUCCESS,
                    travel: response.data
                });
            })
            .catch((error, response) => {
                dispatch({
                    type: TravelConstants.GET_FAILURE,
                    error: error
                });

                let message,
                    action;

                switch(error.response.status) {
                    case 404:
                        message = 'Ce voyage est introuvable';
                        action = {
                            label: 'Revenir à la liste',
                            callback: () => {
                                dispatch(push('/'));
                            }
                        };
                        break;
                    default:
                        message = 'Une erreur s\'est produite lors de l\'accès au serveur.';
                        action = {
                            label: 'Réessayer',
                            callback: () => {
                                fetchTravel(id)(dispatch);
                            }
                        };
                }

                dispatch(Notifications.error({
                    title: 'Oh!',
                    message: message,
                    autoDismiss: 0,
                    action: action
                }));
            })
        ;
    }
};

export const setTravel = (travel) => {
    return dispatch => {
        dispatch({
            type: TravelConstants.SET_TRAVEL,
            travel
        });
    }
};