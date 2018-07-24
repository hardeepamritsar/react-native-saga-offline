
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

export const removeFromOfflineActionQueue = action => ({
  type: actionTypes.REMOVE_FROM_OFFLINE_ACTION_QUEUE,
  payload: action,
});

export const markAsFromOfflineQueue = (action) => {
  const offlineAction = action;
  if (!offlineAction.meta) {
    offlineAction.meta = {};
  }
  offlineAction.meta.actionFromOfflineQueue = true;
  return offlineAction;
};
