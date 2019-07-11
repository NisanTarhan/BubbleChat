import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

export const EMAIL_CHANGED = 'EMAIL_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

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


export const login = (email, password) => {
    return (dispatch) => {
        if (validate(email, password)) {
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

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(String(password));
}


const validate = (email, password) => {
    switch (true) {
        case (password == '' || email == ''):
            Alert.alert("Lütfen bütün alanları doldurun!");
            return false;
        case (validateEmail(email) == false):
            Alert.alert("Lütfen geçerli bir email adresi giriniz.");
            return false;
        case (validatePassword(password) == false):
            Alert.alert("Şifre en az 6 karakter olmalı, harf ve rakam içermelidir!");
            return false;
        default:
            return true;
    }
}