import { SavedResponseActionTypes } from './saved-response.types';

export const saveInputResponse = userResponse => (
  {
    type: SavedResponseActionTypes.SAVE_RESPONSE,
    payload: userResponse
  }
);