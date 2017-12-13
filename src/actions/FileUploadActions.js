import {CancelToken} from 'axios';

import * as FileUploadConstants from '../constants/FileUploadConstants';

import axios from '../helpers/axios';

let cancel;

export const uploadFile = (data, originalFilename) => {
    return dispatch => {
        dispatch({
            type: FileUploadConstants.UPLOAD_REQUESTED,
        });

        let url = '/uploads';

        let options = {
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
            }),
        };

        return axios().post(url, data, options)
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