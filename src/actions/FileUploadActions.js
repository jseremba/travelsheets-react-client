import axios from 'axios';

import * as FileUploadConstants from '../constants/FileUploadConstants';
import {API_URL} from "../settings/configuration";

const CancelToken = axios.CancelToken;
let cancel;

export const uploadFile = (data, originalFilename) => {
    return dispatch => {
        dispatch({
            type: FileUploadConstants.UPLOAD_REQUESTED,
        });

        let url = API_URL + '/uploads';

        axios.post(url, data, {
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
            }),
        })
            .then(response => {
                dispatch({
                    type: FileUploadConstants.UPLOAD_SUCCESS,
                    file: {
                        ...response.data,
                        originalFilename
                    },
                });
            })
            .catch(error => {
                dispatch({
                    type: FileUploadConstants.UPLOAD_FAILED,
                })
            });
    };
};

export const resetValue = () => {
    return dispatch => {
        dispatch({
            type: FileUploadConstants.RESET_VALUE,
        });

        if(cancel) cancel();
    };
};