import { sampleData } from '../../app/api/sampleData';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './eventConstants';

const initialState = {
  events: sampleData,
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, action.event],
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter(event => event.id !== action.event.id),
          action.event,
        ],
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter(event => event.id !== action.eventId)],
      };
    default:
      return state;
  }
}
