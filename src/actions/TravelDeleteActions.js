import axios from '../helpers/axios';
import Notifications from "react-notification-system-redux";

import * as TravelDeleteConstants from '../constants/TravelDeleteConstants';

import {push} from "react-router-redux";

export const deleteTravel = (id) => {
    return dispatch => {
        dispatch({
            type: TravelDeleteConstants.DELETE_REQUESTED
        });

        let url = `/travels/${id}`;

        return axios().delete(url)
            .then(() => {
                dispatch({
                    type: TravelDeleteConstants.DELETE_SUCCESS,
                });

                dispatch(Notifications.success({
                    title: 'Yeah!',
                    message: 'Le voyage à bien été supprimé.',
                }));

                dispatch(push('/'));
            })
            .catch(error => {
                dispatch({
                    type: TravelDeleteConstants.DELETE_FAILURE,
                    error: error
                });

                dispatch(Notifications.error({
                    title: 'Oh!',
                    message: 'Une erreur s\'est produite lors de l\'accès au serveur.',
                    autoDismiss: 0,
                    action: {
                        label: 'Réessayer',
                        callback: () => {
                            deleteTravel(id)(dispatch);
                        }
                    }
                }));
            })
    };
};

export const openModal = () => {
    return dispatch => {
        dispatch({
            type: TravelDeleteConstants.OPEN_MODAL,
        });
    };
};

export const closeModal = () => {
    return dispatch => {
        dispatch({
            type: TravelDeleteConstants.CLOSE_MODAL,
        });
    };
};