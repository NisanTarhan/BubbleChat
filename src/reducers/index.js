import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import MapReducer from './mapReducer';
import CreateBubbleReducer from './createBubbleReducer';

export default combineReducers({
    auth: AuthReducer,
    mapReducer: MapReducer,
    createReducer: CreateBubbleReducer
})