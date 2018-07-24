import reducer from './reducer';
import actionTypes from './actionTypes';

const state = {
  data: { data: 'DataDataData' },
  offlineQueue: [{ type: 'action', payload: 'dummy payload' }],
};

describe('Test reducer', () => {
  it('it should update connection status to be true', async () => {
    const action = {
      type: actionTypes.NETWORK_CHANGE_REACHABLE,
    };
    const newSatate = reducer(state, action);
    expect(newSatate.isConnected).toBe(true);
  });

  it('it should update connection status to be false', async () => {
    const action = {
      type: actionTypes.NETWORK_CHANGE_UNREACHABLE,
    };
    const newSatate = reducer(state, action);
    expect(newSatate.isConnected).toBe(false);
  });

  it('it should add action to offline Queue', async () => {
    const addAction = {
      type: actionTypes.ADD_TO_OFFLINE_ACTION_QUEUE,
      payload: 'OfflineActionPayload',
    };

    const newSatate = reducer(state, addAction);
    expect(newSatate.offlineQueue[1].type).toBe(actionTypes.ADD_TO_OFFLINE_ACTION_QUEUE);
    expect(newSatate.offlineQueue[1].payload).toBe('OfflineActionPayload');
    expect(newSatate.offlineQueue.length).toBe(2);
  });

  it('it should add action to offline Queue and remove from queue', async () => {
    const addAction = {
      type: actionTypes.ADD_TO_OFFLINE_ACTION_QUEUE,
      payload: 'OfflineActionPayload',
    };

    let newSatate = reducer(state, addAction);
    expect(newSatate.offlineQueue[1].type).toBe(actionTypes.ADD_TO_OFFLINE_ACTION_QUEUE);
    expect(newSatate.offlineQueue[1].payload).toBe('OfflineActionPayload');
    expect(newSatate.offlineQueue.length).toBe(2);

    const removeAction = {
      type: actionTypes.REMOVE_FROM_OFFLINE_ACTION_QUEUE,
      payload: 'OfflineActionPayload',
    };
    newSatate = reducer(state, removeAction);
    expect(newSatate.offlineQueue.length).toBe(1);
  });
});
