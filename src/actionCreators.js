
import actionTypes from './actionTypes';

export const networkRreachable = () => ({
  type: actionTypes.NETWORK_CHANGE_REACHABLE,
});

export const networkUnRreachable = () => ({
  type: actionTypes.NETWORK_CHANGE_UNREACHABLE,
});
export const addToOfflineActionQueue = action => ({
  type: actionTypes.ADD_TO_OFFLINE_ACTION_QUEUE,
  payload: {
    action,
  },
});
export const offlineActionQueue = action => {
  let newAction =  {
    type: actionTypes.ADD_TO_OFFLINE_ACTION_QUEUE,
    payload: {
      action,
    },
  }
  return newAction;
};
export const removeFromOfflineActionQueue = action => ({
  type: actionTypes.REMOVE_FROM_OFFLINE_ACTION_QUEUE,
  payload: offlineActionQueue(action),
});
