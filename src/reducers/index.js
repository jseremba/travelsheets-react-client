import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import TravelsReducer from './TravelsReducer';
import TravelReducer from './TravelReducer';
import StepReducer from './StepReducer';
import TravelAddReducer from "./TravelAddReducer";

export default combineReducers({
    routing: routerReducer,
    travels: TravelsReducer,
    TravelReducer: TravelReducer,
    TravelAddReducer: TravelAddReducer,
    StepReducer: StepReducer,
});