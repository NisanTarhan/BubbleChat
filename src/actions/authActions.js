import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const EMAIL_CHANGED = 'EMAIL_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

//İstek atmadığımız için action burada hazır ve geldiği an geri dönebiliyor.
//SENKRON İŞLEM
export const emailChanged = (email) => {
    return {
        type: EMAIL_CHANGED,
        payload: email
    }
}

export const passwordChanged = (password) => {
    return {
        type: PASSWORD_CHANGED,
        payload: password
    }
}


/*Burada login isteğini atıcaz ve burada bir gecikme olacak ve bizim bir şey dönmemiz gerekecek.
Action bitmediği için action dönemeyeceğiz.Bizim burada bir fonksiyon dönememiz gerekiyor. 
(dispatch ile döneceğiz)Burada Firebase'e bir istek attık ve burada bir gecikme olacak.
Yani bu bir asenkron işlem olacak. Yukarıdaki gibi senkron bir işlem olmayacak.
Döndüğümüz fonksiyon işlem sonuçlandıktan sonra bir açtion dönecek.
O action da reducer'ı güncelleyecek, daha sonra da bizim state'imiz güncellenecek ve biz de
bu güncel state'i alacağız. Bu işlemler için bir ara katman olan ReduxThunk kullanacağız.
Bu bir Redux kütüphanesidir.
*/
export const login = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_START,
        });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginSuccess(dispatch, user))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginSuccess(dispatch, user))
                    .catch(() => loginFailed(dispatch))
            })
    }
}

const loginSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: user
    })
    Actions.main();
}

const loginFailed = (dispatch) => {
    dispatch({
        type: LOGIN_FAILED
    })
}

