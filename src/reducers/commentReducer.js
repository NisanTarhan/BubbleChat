import {
    SAVE_COMMENT
} from '../actions';

const INITIAL_STATE = {
    comment:''
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_COMMENT:
            return { ...state, ...INITIAL_STATE }
        default:
            return state
    }
}