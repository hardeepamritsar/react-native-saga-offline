import { isEqual, find, without } from 'lodash';
import actionTypes from './actionTypes';

export const initialState = { isConnected: null, offlineQueue: [] };

function handleOfflineAction(state, action) {
  const similarActionQueued = find(state.offlineQueue, foundAction => isEqual(action, foundAction));

  if (!similarActionQueued) {
    return { ...state, offlineQueue: [...state.offlineQueue, action] };
  }
  return state;
}

function handleRemoveActionFromQueue(state, action) {
  return { ...state, offlineQueue: without(state.offlineQueue, action) };
}
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.NETWORK_CHANGE_REACHABLE:
      return {
        ...state,
        isConnected: true,
      };
    case actionTypes.NETWORK_CHANGE_UNREACHABLE:
      return {
        ...state,
        isConnected: false,
      };

    case actionTypes.ADD_TO_OFFLINE_ACTION_QUEUE:
      return handleOfflineAction(state, action);
    case actionTypes.REMOVE_FROM_OFFLINE_ACTION_QUEUE:
      return handleRemoveActionFromQueue(state, payload);
    default:
      return state;
  }
};
