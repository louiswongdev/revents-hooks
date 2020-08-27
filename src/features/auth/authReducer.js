import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';

const initialState = {
  authenticated: true,
  currentUser: {
    email: 'bob@gmail.com',
    photoURL: '/assets/user.png',
  },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: action.values.email,
          photoURL: '/assets/user.png',
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