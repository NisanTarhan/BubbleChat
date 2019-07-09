import {
    TITLE_CHANGED,
    REGION_CHANGED,
    SAVE_BUBBLE,
    LOCATION_CHANGED,
    FETCH_BUBBLE
} from '../actions';

const INITIAL_STATE = {
    title: '',
    location: {},
    loading: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TITLE_CHANGED: //CreateBubble Ekranındaki title actionı
            return { ...state, title: action.payload }
        case REGION_CHANGED: //Map Ekranındaki action
            return { ...state, title: action.payload }
        case SAVE_BUBBLE: //CreateBuuble Ekranındaki button actionı
            return { ...state, ...INITIAL_STATE }
        case LOCATION_CHANGED:
            return { ...state, location: action.payload }
        case FETCH_BUBBLE:
            return action.payload
        default:
            return state
    }
}