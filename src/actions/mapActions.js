import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const TITLE_CHANGED = 'TITLE_CHANGED';
export const REGION_CHANGED = 'REGION_CHANGED';
export const SAVE_BUBBLE = 'SAVE_BUBBLE';
export const LOCATION_CHANGED = 'LOCATION_CHANGED';
export const FETCH_BUBBLE = 'FETCH_BUBBLE';
const REF_DATABASE = '/bubbles';

export const changeTitle = (title) => {
    return {
        type: TITLE_CHANGED,
        payload: title,
    }
}

export const changeRegion = (region) => {
    return {
        type: REGION_CHANGED,
        payload: region
    }
}

export const changeLocation = (location) => {
    return {
        type: LOCATION_CHANGED,
        payload: location
    }
}

export const saveBubble = (title, location) => {
    const currentUser = firebase.auth().currentUser;
    const email = currentUser.email;
    return (dispatch) => {
        firebase.database().ref(REF_DATABASE)
            .push({ email, title, location })
            .then(() => {
                Actions.pop({ refresh: { data: { location } } })
                dispatch({
                    type: SAVE_BUBBLE,
                })
            })
    }
}

export const fetchBuble = () => {
    return (dispatch) => {
            firebase.database().ref(REF_DATABASE)
            .on('value', (snapshot) => {
                dispatch({
                    type: FETCH_BUBBLE,
                    payload: snapshot.val()
                })
            })
    }
}

// export const addCommand = (command) => {

// }