import configureMockStore from 'redux-mock-store';
import Network from 'react-native-internet-reachability';
import reducer from './reducer';
import Connectivity from './Connectivity';
import { networkRreachable, networkUnRreachable } from './actionCreators';
import createSagaOfflineMiddleware from './index';

jest.mock('react-native-internet-reachability', () => ({
  isReachable: jest.fn(),
}));

const storeObj = {
  data: { data: 'DataDataData' },
  offline: {
    offlineQueue: [],
    isConnected: null,
  },
};
const sagaOffline = createSagaOfflineMiddleware();
const middlewares = [sagaOffline];

const mockStore = configureMockStore(middlewares);

describe('Test isConnected function', () => {
  it('it should return true/false based upon connectivity status', async () => {
    Network.isReachable.mockImplementation(() => false);
    let isConnected = await Connectivity.isConnected();
    expect(isConnected).toBe(false);
    Network.isReachable.mockImplementation(() => true);
    isConnected = await Connectivity.isConnected();
    expect(isConnected).toBe(true);
  });
});

describe('Test updateAvailability()', () => {
  it('should dispatch action @@network-connectivity/NETWORK_CHANGE_UNREACHABLE action and check for connectivity changes ', () => {
    Network.isReachable.mockImplementation(() => false);
    const store = mockStore(storeObj);
    const connectivity = new Connectivity(store);

    return connectivity.handleConnectivityChange().then(() => {
      expect(store.getActions()[0].type).toEqual(networkUnRreachable().type);
      const newSatate = reducer(store.getState(), store.getActions()[0]);
      expect(newSatate.isConnected).toBe(false);
    });
  });

  describe('Test updateAvailability() no change', () => {
    it('should not dispatch any action', () => {
      Network.isReachable.mockImplementation(() => false);
      const store = mockStore(storeObj);
      const connectivity = new Connectivity(store);
      connectivity.previousConnectionState = false;
      return connectivity.handleConnectivityChange().then(() => {
         expect(store.getActions().length).toEqual(0);
      });
    });
  });
  
  it('should dispatch action @@network-connectivity/NETWORK_CHANGE_REACHABLE action and check for connectivity changes ', () => {
    Network.isReachable.mockImplementation(() => true);
    const store = mockStore(storeObj);
    const connectivity = new Connectivity(store);
    return connectivity.handleConnectivityChange().then(() => {
      expect(store.getActions()[0].type).toEqual(networkRreachable().type);
      const newSatate = reducer(store.getState(), store.getActions()[0]);
      expect(newSatate.isConnected).toBe(true);
    });
  });
});

