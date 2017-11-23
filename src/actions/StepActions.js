import axios from 'axios';

import * as StepConstants from '../constants/StepConstants';

import {API_URL} from "../settings/configuration";


export const fetchSteps = (travel) => {
    return dispatch => {
        dispatch({
            type: StepConstants.GET_REQUESTED
        });

        let url = `${API_URL}/travels/${travel}/steps`;

        return axios.get(url)
            .then(response => {
                dispatch({
                    type: StepConstants.GET_SUCCESS,
                    collection: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: StepConstants.GET_FAILURE,
                    error: error
                });
            })
            ;
    }
};