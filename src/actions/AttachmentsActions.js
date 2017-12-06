import axios from 'axios';
import * as Notifications from "react-notification-system-redux";

import * as AttachmentsConstants from '../constants/AttachmentsConstants';

import {API_URL} from "../settings/configuration";

const CancelToken = axios.CancelToken;
let cancel;

export const fetchAttachments = (travelId, stepId) => {
    return dispatch => {
        dispatch({
            type: AttachmentsConstants.LIST_REQUESTED,
        });

        let url = `${API_URL}/travels/${travelId}/steps/${stepId}/attachments`;

        return axios
            .get(url, {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancel = c;
                }),
            })
            .then(response => {
                dispatch({
                    type: AttachmentsConstants.LIST_SUCCESS,
                    collection: response.data,
                });
            })
            .catch(error => {
                if (!axios.isCancel(error)) {
                    dispatch({
                        type: AttachmentsConstants.LIST_FAILURE,
                        error: error,
                    });

                    dispatch(Notifications.error({
                        title: 'Oh!',
                        message: 'Une erreur s\'est produite lors de la récupération des fichiers.',
                        autoDismiss: 0,
                        action: {
                            label: 'Réessayer',
                            callback: () => {
                                fetchAttachments(travelId, stepId)(dispatch);
                            }
                        }
                    }));
                }
            });
    };
};

export const resetAttachments = () => {
    return dispatch => {
        dispatch({
            type: AttachmentsConstants.RESET_ATTACHMENTS,
        });

        if(cancel) {
            cancel();
        }
    };
};