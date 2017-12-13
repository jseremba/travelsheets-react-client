import axios from '../helpers/axios';
import {CancelToken, isCancel} from 'axios';
import * as Notifications from "react-notification-system-redux";

import * as AttachmentsConstants from '../constants/AttachmentsConstants';

let cancel;

export const fetchAttachments = (travelId, stepId) => {
    return dispatch => {
        dispatch({
            type: AttachmentsConstants.LIST_REQUESTED,
        });

        let url = `/travels/${travelId}/steps/${stepId}/attachments`;

        let options = {
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
            }),
        };

        return axios().get(url, options)
            .then(response => {
                dispatch({
                    type: AttachmentsConstants.LIST_SUCCESS,
                    collection: response.data,
                });
            })
            .catch(error => {
                if (!isCancel(error)) {
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

export const deleteAttachment = (travelId, stepId, attachmentId) => {
    return dispatch => {
        dispatch({
            type: AttachmentsConstants.DELETE_REQUESTED,
            attachmentId,
        });

        let url = `/travels/${travelId}/steps/${stepId}/attachments/${attachmentId}`;

        return axios().delete(url)
            .then(response => {
                dispatch({
                    type: AttachmentsConstants.DELETE_SUCCESS,
                });

                dispatch(Notifications.success({
                    title: 'Yeah!',
                    message: 'Le fichier à bien été supprimé',
                }));
            })
            .catch(error => {
                dispatch({
                    type: AttachmentsConstants.DELETE_FAILURE,
                });

                dispatch(Notifications.error({
                    title: 'Oh!',
                    message: 'Une erreur s\'est produite lors de la suppression du fichier.',
                    autoDismiss: 0,
                    action: {
                        label: 'Réessayer',
                        callback: () => {
                            deleteAttachment(travelId, stepId, attachmentId)(dispatch);
                        }
                    }
                }));
            })
    }
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

export const pushAttachment = (attachment) => {
    return dispatch => {
        dispatch({
            type: AttachmentsConstants.PUSH_ATTACHMENT,
            attachment,
        });
    }
};