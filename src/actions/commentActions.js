import firebase from 'firebase';

export const SAVE_COMMENT = 'SAVE_COMMENT';
export const FETCH_COMMENT = 'FETCH_COMMENT';
const REF_DATABASE = '/bubbles';

export const saveComment = (bubbleId, comment) => {
    const currentUser = firebase.auth().currentUser;
    const email = currentUser.email;
    return (dispatch) => {
        console.log("DATABASE e giden yorum");
        console.log({ bubbleId ,email, comment })
        firebase.database().ref(REF_DATABASE).child(bubbleId).child('comments')
            .push({ email, comment })
            .then(() => {
                dispatch({
                    type: SAVE_COMMENT,
                })
            })
    }
}

export const fetchComment = (bubbleId) => {
    return (dispatch) => {
        console.log("DATABASE e giden yorum");
        console.log(bubbleId)
            firebase.database().ref(REF_DATABASE).child(bubbleId).child('comments')
            .on('value', (snapshot) => {
                dispatch({
                    type: FETCH_COMMENT,
                    payload: snapshot.val()
                })
            })
    }
}