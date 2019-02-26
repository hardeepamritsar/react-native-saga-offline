import configureMockStore from 'redux-mock-store';
import Network from 'react-native-internet-reachability';
import reducer from './reducer';
import { networkRreachable, removeFromOfflineActionQueue, addToOfflineActionQueue } from './actionCreators';
import createSagaOfflineMiddleware from './index';

jest.mock('react-native-internet-reachability', () => ({
  isReachable: jest.fn(),
}));

const storeObj = {
  data: { data: 'DataDataData' },
  offline: {
    offlineQueue: [
      {
        payload: {
          action: {
            type: 'action',
            payload: 'dummy payload',
          },
        },
      },
    ],
    isConnected: false,
  },
};
const sagaOffline = createSagaOfflineMiddleware();
const middlewares = [sagaOffline];

const mockStore = configureMockStore(middlewares);

describe('Test createSagaOfflineMiddleware', () => {
  it('should dispatch action @@network-connectivity/ADD_TO_OFFLINE_ACTION_QUEUE action and add offline actions ', () => {
    Network.isReachable.mockImplementation(() => false);
    const store = mockStore(storeObj);
    return store.dispatch(addToOfflineActionQueue(storeObj.offline.offlineQueue[0].payload.action)).then(() => {
      expect(store.getActions()[0].type).toEqual(addToOfflineActionQueue().type);
      const newSatate = reducer(store.getState().offline, store.getActions()[0]);
      expect(newSatate.offlineQueue.length).toBe(2);
    });
  });

  it('should dispatch action @@network-connectivity/REMOVE_FROM_OFFLINE_ACTION_QUEUE action and remove offline actions ', () => {
    Network.isReachable.mockImplementation(() => true);
    const store = mockStore(storeObj);
    return store.dispatch(networkRreachable()).then(() => {
      expect(store.getActions()[0].type).toEqual(removeFromOfflineActionQueue().type);
      const newSatate = reducer(store.getState(), store.getActions()[0]);
      expect(newSatate.offlineQueue.length).toBe(0);
    });
  });
});

