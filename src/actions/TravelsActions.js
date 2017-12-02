import axios from 'axios';
import {push} from 'react-router-redux';
import queryString from 'query-string';
import Notifications from 'react-notification-system-redux';

import * as TravelConstant from '../constants/TravelsConstants';
import {API_URL} from '../settings/configuration';


/**
 * ListTravels action
 *
 * @returns {{type}}
 */
export const fetchTravels = (page, keyword) => {
    return dispatch => {
        dispatch({
            type: TravelConstant.LIST_REQUESTED
        });

        let url = `${API_URL}/travels`;
        let query = {};

        if(page) {
            query = {
                ...query,
                page: page
            };
        }

        if(keyword) {
            query = {
                ...query,
                search: keyword
            };
        }

        query = queryString.stringify(query);

        return axios.get(url + '?' + query)
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
                            fetchTravels(page, keyword)(dispatch);
                        }
                    }
                }));
            })
        ;
    }
};

export const searchTravels = (keyword, page) => {
    return (dispatch, getState) => {
        let props = getState();
        let query = queryString.parse(props.routing.location.search);

        query = queryString.stringify({
            ...query,
            page: page ? page : undefined,
            search: keyword ? keyword : undefined
        });

        dispatch(push({
            search: `?${query}`,
        }));
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

/**
 * Action SetSearchBar
 *
 * @param keyword
 * @returns {{type: *, keyword: *}}
 */
export const setSearchBar = (keyword) => {
    return (dispatch) => {
        dispatch({
            type: TravelConstant.SET_SEARCH_BAR,
            keyword: keyword ? keyword : ""
        });
    }
};