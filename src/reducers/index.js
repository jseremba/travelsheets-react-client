import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import TravelsReducer from './TravelsReducer';

export default combineReducers({
    routing: routerReducer,
    travels: TravelsReducer
});