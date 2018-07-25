
import { markAsFromOfflineQueue } from './actionCreators';

const action = { type: 'action', payload: 'dummy payload', meta:{} };

describe('Test markAsFromOfflineQueue function', () => {
  it('it should add meta.actionFromOfflineQueue as true ', () => {
    const updatedAction = markAsFromOfflineQueue(action);
    expect(updatedAction.meta.actionFromOfflineQueue).toBe(true);
  });
});