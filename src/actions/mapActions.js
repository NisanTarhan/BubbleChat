import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const TITLE_CHANGED = 'TITLE_CHANGED';
export const REGION_CHANGED = 'REGION_CHANGED';
export const SAVE_BUBBLE = 'SAVE_BUBBLE';
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

export const saveBubble = (title) => {
    const currentUser = firebase.auth().currentUser;
    const email = currentUser.email;
    console.log('Title:' + title + ' Email:' + email)
    return (dispatch) => {
        firebase.database().ref(REF_DATABASE)
            .push({ email, title })
            .then( () => {
                Actions.pop();
                dispatch({
                    type: SAVE_BUBBLE,
                })
            })
    }
}

// export const addCommand = (command) => {

// }