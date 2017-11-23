import axios from 'axios';

import * as TravelConstant from '../constants/TravelConstants';

import {API_URL} from "../settings/configuration";

export const fetchTravel = (id) => {
    return dispatch => {
        dispatch({
            type: TravelConstant.GET_REQUESTED
        });

        let url = `${API_URL}/travels/${id}`;

        return axios.get(url)
            .then(response => {
                dispatch({
                    type: TravelConstant.GET_SUCCESS,
                    travel: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: TravelConstant.GET_FAILURE,
                    error: error
                });
            })
        ;
    }
};