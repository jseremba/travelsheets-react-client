import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import TravelsReducer from './TravelsReducer';
import TravelReducer from './TravelReducer';
import StepReducer from './StepReducer';

export default combineReducers({
    routing: routerReducer,
    travels: TravelsReducer,
    TravelReducer: TravelReducer,
    StepReducer: StepReducer
});