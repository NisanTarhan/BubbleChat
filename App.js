/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers'
import ReduxThunk from 'redux-thunk';
import Router from './src/Router';


export default class App extends Component {

  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyDhaRUvSYIcKGXyPBaIFOKQiaK1ob0gGfg",
      authDomain: "bubblechat-4b7a9.firebaseapp.com",
      databaseURL: "https://bubblechat-4b7a9.firebaseio.com",
      projectId: "bubblechat-4b7a9",
      storageBucket: "",
      messagingSenderId: "944300929705",
      appId: "1:944300929705:web:654fce2656ab7f35"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    // {} -> Burada default olarak vermek istediğimiz değer varsa onu verebiliriz.
    // Örnek: { auth: {email:'test@test.com'} }
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

