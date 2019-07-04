import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../actions';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: {},
    error: '',
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    console.log(state)
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload }
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case LOGIN_START:
            return {...state, loading: true, error:'' }
        case LOGIN_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload} //Success olduğu durumda State'i INITIAL_STATE'e çekiyoruz.
        case LOGIN_FAILED:
            return {...state, loading: false, error: 'Authentication Failed'}
        default:
            return state
    }
}