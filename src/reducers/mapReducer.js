import {
    FETCH_BUBBLE
} from '../actions';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BUBBLE:
            return action.payload
        default:
            return state
    }
}