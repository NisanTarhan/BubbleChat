import {
    SAVE_COMMAND
} from '../actions';

const INITIAL_STATE = {
    command:''
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_COMMAND:
            return { ...state, ...INITIAL_STATE }
        default:
            return state
    }
}