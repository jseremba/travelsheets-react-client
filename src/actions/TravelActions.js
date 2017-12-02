import axios from 'axios';
import Notifications from "react-notification-system-redux";

import * as TravelConstants from '../constants/TravelConstants';

import {API_URL} from "../settings/configuration";

export const fetchTravel = (id) => {
    return dispatch => {
        dispatch({
            type: TravelConstants.GET_REQUESTED
        });

        let url = `${API_URL}/travels/${id}`;

        return axios.get(url)
            .then(response => {
                dispatch({
                    type: TravelConstants.GET_SUCCESS,
                    travel: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: TravelConstants.GET_FAILURE,
                    error: error
                });

                dispatch(Notifications.error({
                    title: 'Oh!',
                    message: 'Une erreur s\'est produite lors de l\'accès au serveur.',
                    autoDismiss: 0,
                    action: {
                        label: 'Réessayer',
                        callback: () => {
                            fetchTravel(id)(dispatch);
                        }
                    }
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