import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import MapReducer from './mapReducer';

export default combineReducers({
    auth: AuthReducer,
    mapReducer: MapReducer
})