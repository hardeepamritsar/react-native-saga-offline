import Network from 'react-native-reachability';
import actionTypes from './actionTypes';
import { addToOfflineActionQueue, removeFromOfflineActionQueue, markAsFromOfflineQueue } from './actionCreators';

function createSagaOfflineMiddleware() {
  return ({ getState }) => next => async (action) => {
    processOfflineQueue(action, getState, next);
    addActinoToOfflineQueue(action, next);
    return next(action);
  };
}

async function addActinoToOfflineQueue(action, next) {
  if (action.meta && action.meta.retry) {
    const isReachable = await Network.isReachable();
    if (!isReachable) {
      next(addToOfflineActionQueue(action));
    }
  }
}

function processOfflineQueue(action, getState, next) {
  if (action.type === actionTypes.NETWORK_CHANGE_REACHABLE) {
    const { offlineQueue } = getState().offline;
    offlineQueue.forEach((actionFromOfflineQueue) => {
      next(removeFromOfflineActionQueue(actionFromOfflineQueue));
      const offlineActionToDispatch = markAsFromOfflineQueue(actionFromOfflineQueue.payload.action);
      next(offlineActionToDispatch);
    });
  }
}

export default createSagaOfflineMiddleware;
