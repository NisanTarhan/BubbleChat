import {
    TITLE_CHANGED,
    REGION_CHANGED,
    SAVE_BUBBLE,
    LOCATION_CHANGED,
} from '../actions';

const INITIAL_STATE = {
    title: '',
    location: {},
    loading: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TITLE_CHANGED: 
            return { ...state, title: action.payload }
        case SAVE_BUBBLE: 
            return { ...state, ...INITIAL_STATE }
        case LOCATION_CHANGED:
            return { ...state, location: action.payload }
        default:
            return state
    }
}