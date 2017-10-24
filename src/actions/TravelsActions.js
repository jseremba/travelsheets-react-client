import axios from 'axios';

import * as TravelConstant from '../constants/TravelsConstants';
import {API_URL} from '../settings/configuration';


/**
 * ListTravels action
 *
 * @returns {{type}}
 */
export const fetchTravels = (page) => {
    page = page ? page : 1;

    return dispatch => {
        dispatch({
            type: TravelConstant.LIST_REQUESTED
        });

        return axios.get(`${API_URL}/travels?page=${page}`)
            .then(response => {
                let travels = response.data;

                if(travels['hydra:member']) {
                    travels['hydra:member'] = travels['hydra:member'].map(function(item) {
                        let explode = item['@id'].split('/');

                        return {
                            ...item,
                            id: explode[explode.length - 1]
                        };
                    });
                }

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