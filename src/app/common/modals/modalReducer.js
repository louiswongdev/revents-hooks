const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModal(modal) {
  return {
    type: OPEN_MODAL,
    modal,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

const initialState = null;

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      const { modalType, modalProps } = action.modal;
      return { modalType, modalProps };
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}
