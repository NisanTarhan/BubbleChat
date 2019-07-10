import firebase from 'firebase';

export const SAVE_COMMAND = 'SAVE_COMMAND';
export const FETCH_COMMAND = 'FETCH_COMMAND';
const REF_DATABASE = '/commands';

export const saveCommand = (command) => {
    const currentUser = firebase.auth().currentUser;
    const email = currentUser.email;
    return (dispatch) => {
        firebase.database().ref(REF_DATABASE)
        .push({email, command})
        .then(() => {
            dispatch({
                type: SAVE_COMMAND,
            })
        })
    }
}