import Network from 'react-native-internet-reachability';
import { networkRreachable, networkUnRreachable } from './actionCreators';

export default class Connectivity {
  constructor(store) {
    this.store = store;
    this.previousConnectionState = null;
    setInterval(this.handleConnectivityChange.bind(this), 10000);
  }

  updateAvailability(isConnected) {
    if (this.previousConnectionState !== isConnected) {
      if (isConnected) {
        this.store.dispatch(networkRreachable());
      } else {
        this.store.dispatch(networkUnRreachable());
      }
    }
    this.previousConnectionState = isConnected;
  }

  async handleConnectivityChange() {
    this.updateAvailability(await Network.isReachable());
  }

  static async isConnected() {
    return Network.isReachable();
  }
}
