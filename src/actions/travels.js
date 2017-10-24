import * as TravelConstant from '../constants/travels';

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

        // Mock server
        return setTimeout(() => {
            dispatch({
                type: TravelConstant.LIST_SUCCESS,
                travels: [
                    {
                        "@id": "/app_dev.php/travels/1",
                        "@type": "Travel",
                        "id": 1,
                        "name": "New travel 5",
                        "summary": "Lorem ipsum dolor",
                        "dateStart": "2017-01-01T00:00:00+00:00",
                        "dateEnd": null
                    },
                    {
                        "@id": "/app_dev.php/travels/2",
                        "@type": "Travel",
                        "id": 2,
                        "name": "New travel 6",
                        "summary": "Lorem ipsum dolor",
                        "dateStart": "2017-01-01T00:00:00+00:00",
                        "dateEnd": null
                    }
                ]
            });
        }, 3000);
    }
};