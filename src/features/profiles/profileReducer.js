import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_PHOTOS,
} from './profileConstants';

const initialState = {
  currentUserProfile: null,
  selectedUserProfile: null,
  photos: [],
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: action.profile,
      };
    case LISTEN_TO_SELECTED_USER_PROFILE:
      return {
        ...state,
        selectedUserProfile: action.profile,
      };
    case LISTEN_TO_USER_PHOTOS:
      return {
        ...state,
        photos: action.photos,
      };
    default: {
      return state;
    }
  }
}
