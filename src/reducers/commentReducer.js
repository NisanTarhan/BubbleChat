import {
    SAVE_COMMENT, 
    FETCH_COMMENT
} from '../actions';

const INITIAL_STATE = {
    comment: ''
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_COMMENT:
            return { ...state, ...INITIAL_STATE }
        case FETCH_COMMENT:
            return action.payload
        default:
            return state
    }
}