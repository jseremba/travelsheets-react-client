import * as TravelConstant from '../constants/travels';

/**
 * ListTravels action
 *
 * @returns {{type}}
 */
function listTravels() {
    return {
        type: TravelConstant.LIST
    }
}

/**
 * ListTravelSuccess action
 *
 * @param travels
 * @returns {{type, travels: *}}
 */
function listTravelsSuccess(travels) {
    return {
        type: TravelConstant.LIST_SUCCESS,
        travels
    }
}

/**
 * ListTravelFailure action
 *
 * @returns {{type}}
 */
function listTravelFailure() {
    return {
        type: TravelConstant.LIST_FAILURE
    };
}

export {
    listTravels,
    listTravelsSuccess,
    listTravelFailure
}