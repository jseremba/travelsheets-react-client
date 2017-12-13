import axios from '../helpers/axios';
import {push} from 'react-router-redux';
import queryString from 'query-string';
import Notifications from 'react-notification-system-redux';

import * as TravelConstant from '../constants/TravelsConstants';

/**
 * ListTravels action
 *
 * @returns {{type}}
 */
export const fetchTravels = (page, past = false) => {
    return dispatch => {
        dispatch({
            type: TravelConstant.LIST_REQUESTED
        });

        let url = `/travels`;
        let query = {};

        if(page) {
            query = {
                ...query,
                page: page,
                past: past,
            };
        }

        query = queryString.stringify(query);

        return axios().get(url + '?' + query)
            .then(response => {
                dispatch({
                    type: TravelConstant.LIST_SUCCESS,
                    travels: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: TravelConstant.LIST_FAILURE
                });

                dispatch(Notifications.error({
                    title: 'Oh!',
                    message: 'Une erreur s\'est produite lors de l\'accès au serveur.',
                    autoDismiss: 0,
                    action: {
                        label: 'Réessayer',
                        callback: () => {
                            fetchTravels(page)(dispatch);
                        }
                    }
                }));
            })
        ;
    }
};

/**
 * Change pagination currentPage
 *
 * @param page
 * @returns {function(*, *)}
 */
export const changePage = (page) => {
    return (dispatch, getState) => {
        let props = getState();

        let query = queryString.parse(props.routing.location.search);

        query = queryString.stringify({
            ...query,
            page: page
        });

        dispatch(push({
            search: `?${query}`,
        }));
    }
};

export const setPast = (past) => {
    return (dispatch, getState) => {
        let props = getState();

        let query = queryString.parse(props.routing.location.search);

        query = queryString.stringify({
            ...query,
            past: past
        });

        dispatch(push({
            search: `?${query}`
        }));
    }
};