import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as notificationsReducer} from 'react-notification-system-redux';

import TravelsReducer from './TravelsReducer';
import TravelReducer from './TravelReducer';
import StepReducer from './StepReducer';
import TravelFormReducer from "./TravelFormReducer";
import TravelDeleteReducer from "./TravelDeleteReducer";
import StepFormReducer from "./StepFormReducer";

export default combineReducers({
    routing: routerReducer,
    notifications: notificationsReducer,
    travels: TravelsReducer,
    TravelReducer: TravelReducer,
    TravelFormReducer: TravelFormReducer,
    TravelDeleteReducer: TravelDeleteReducer,
    StepReducer: StepReducer,
    StepFormReducer: StepFormReducer,
});