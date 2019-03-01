import Network from 'react-native-internet-reachability';
import actionTypes from './actionTypes';

var timestampOfOfflineQueProcessed = new Date().getTime();

function createSagaOfflineMiddleware() {
  return ({ getState }) => next => async (action) => {
    processOfflineQueue(action, getState, next);
    return next(action);
  };
}

function processOfflineQueue(action, getState, next) {
  const now = Date.now();
  if ( now - timestampOfOfflineQueProcessed >  60000) { // 60 seconds
    timestampOfOfflineQueProcessed = Date.now();
    const { offlineQueue } = getState().offline;
    offlineQueue.forEach((actionFromOfflineQueue) => {
      next(actionFromOfflineQueue.payload.action);
    });
  } 
}

export default createSagaOfflineMiddleware;
