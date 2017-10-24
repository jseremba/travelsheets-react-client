import * as TravelConstant from '../constants/travels';
import axios from 'axios';

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

        return axios.get('http://api.travelsheets.dev/app_dev.php/travels')
            .then(response => {
                let travels = response.data['hydra:member'];

                travels = travels.map(function(travel) {
                    travel.id = travel['@id'].replace('/app_dev.php/travels/', '');
                    return travel;
                });

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