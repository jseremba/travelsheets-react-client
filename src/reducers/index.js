import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import travels from './travels';

export default combineReducers({
    routing: routerReducer,
    travels
});