import * as TravelConstant from '../constants/travels';
import Immutable from 'immutable';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
    return state.merge({
        list: [
            {
                id: 1,
                name: 'Ceci est un voyage',
                summary: 'Lorem ipsum dolor sit amet'
            },
            {
                id: 2,
                name: 'Ceci est un voyage 2',
                summary: 'Lorem ipsum dolor sit amet'
            }
        ]
    });

    // switch(action.type) {
    //     case TravelConstant.LIST_SUCCESS:
    //         return state.merge({ list: action.travels });
    //
    //     case TravelConstant.LIST_FAILURE:
    //         return state.clear();
    //
    //     default:
    //         return state;
    // }
}