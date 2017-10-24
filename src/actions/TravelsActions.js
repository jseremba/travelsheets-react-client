import axios from 'axios';

import * as TravelConstant from '../constants/TravelsConstants';
import {API_URL} from '../settings/configuration';


/**
 * ListTravels action
 *
 * @returns {{type}}
 */
export const listTravels = () => {
    return dispatch => {
        dispatch({
            type: TravelConstant.LIST_REQUESTED
        });

        return axios.get(API_URL + '/travels')
            .then(response => {
                let travels = response.data;

                dispatch({
                    type: TravelConstant.LIST_SUCCESS,
                    travels: travels
                });
            })
            .catch(error => {
                dispatch({
                    type: TravelConstant.LIST_FAILURE
                });
            })
        ;
    }
};