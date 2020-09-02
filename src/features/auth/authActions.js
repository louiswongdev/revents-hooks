import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import firebase from '../../app/config/firebase';
import { signOutFirebase } from '../../app/firestore/firebaseService';
import { APP_LOADED } from '../../app/async/asyncReducer';

export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    user,
  };
}

export function verifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(signInUser(user));
        dispatch({ type: APP_LOADED });
      } else {
        dispatch(signOutUser);
        dispatch({ type: APP_LOADED });
      }
    });
  };
}

export function signOutUser() {
  return async function (dispatch) {
    try {
      await signOutFirebase();
      dispatch({ type: SIGN_OUT_USER });
    } catch (error) {
      throw error;
    }
  };
}
