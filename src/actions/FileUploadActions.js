import axios from 'axios';

import * as FileUploadConstants from '../constants/FileUploadConstants';
import {API_URL} from "../settings/configuration";

export const uploadFile = (data, originalFilename) => {
    return dispatch => {
        dispatch({
            type: FileUploadConstants.UPLOAD_REQUESTED,
        });

        let url = API_URL + '/uploads';

        axios.post(url, data)
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