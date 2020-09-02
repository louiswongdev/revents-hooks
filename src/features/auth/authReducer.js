import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';

const initialState = {
  authenticated: false,
  currentUser: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: action.user.email,
          photoURL: action.user.photoURL,
          uid: action.user.uid,
          displayName: action.user.displayName,
          providerId: action.user.providerData[0].providerId,
        },
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      };
    default:
      return state;
  }
}
