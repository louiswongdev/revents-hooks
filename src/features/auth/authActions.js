import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';

export function signInUser(values) {
  return {
    type: SIGN_IN_USER,
    values,
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}
