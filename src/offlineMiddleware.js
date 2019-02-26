import Network from 'react-native-internet-reachability';
import actionTypes from './actionTypes';

function createSagaOfflineMiddleware() {
  return ({ getState }) => next => async (action) => {
    processOfflineQueue(action, getState, next);
    return next(action);
  };
}

function processOfflineQueue(action, getState, next) {
  if (action.type === actionTypes.NETWORK_CHANGE_REACHABLE) {
    const { offlineQueue } = getState().offline;
    offlineQueue.forEach((actionFromOfflineQueue) => {
      next(actionFromOfflineQueue.payload.action);
    });
  }
}

export default createSagaOfflineMiddleware;
