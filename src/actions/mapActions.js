import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const FETCH_BUBBLE = 'FETCH_BUBBLE';
const REF_DATABASE = '/bubbles';

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
