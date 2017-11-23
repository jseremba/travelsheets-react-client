import axios from 'axios';

import * as StepConstants from '../constants/StepConstants';

import {API_URL} from "../settings/configuration";


export const fetchSteps = (travel) => {
    return dispatch => {
        dispatch({
            type: StepConstants.LIST_REQUESTED
        });

        let url = `${API_URL}/travels/${travel}/steps`;

        return axios.get(url)
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
            })
            ;
    }
};