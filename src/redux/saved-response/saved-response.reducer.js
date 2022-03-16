import { SavedResponseActionTypes } from './saved-response.types';

const INITIAL_STATE = {
  savedResponse: new Map(),
  responded: false
};

const savedResponseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SavedResponseActionTypes.SAVE_RESPONSE:
      return {
        ...state,
        savedResponse: new Map(state.savedResponse.set(action.payload.key, action.payload.value))
      };
    default:
      return state;
  }
};

export default savedResponseReducer;
